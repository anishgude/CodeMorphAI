import json
from dataclasses import dataclass

from sqlalchemy.orm import Session

from app.models.migration_run import MigrationRun
from app.prompts.explain import build_explanation_prompt
from app.prompts.migration import build_migration_prompt
from app.prompts.optimize import build_optimization_prompt
from app.prompts.tests import build_test_prompt
from app.prompts.validate import build_validation_prompt
from app.schemas.migration import (
    ExplainRequest,
    ExplainResponse,
    GenerateTestsRequest,
    GenerateTestsResponse,
    MigrateRequest,
    MigrateResponse,
    OptimizeRequest,
    OptimizeResponse,
    ValidateRequest,
    ValidateResponse,
)
from app.services.openai_service import OpenAIService
from app.utils.chunking import chunk_code
from app.utils.fallbacks import (
    fallback_explanation,
    fallback_migration,
    fallback_optimization,
    fallback_tests,
    fallback_validation,
)
from app.utils.language import infer_language, normalize_language
from app.utils.parser import extract_structure
from app.utils.titles import generate_title
from app.utils.validation import compare_structures


SUPPORTED_PAIRS = {
    ("python", "javascript"),
    ("javascript", "python"),
    ("java", "python"),
    ("python", "java"),
    ("cpp", "python"),
    ("python", "go"),
}


@dataclass
class ContextBundle:
    source_language: str
    target_language: str
    structure_summary: str


class MigrationService:
    def __init__(self, db: Session):
        self.db = db
        self.openai = OpenAIService()

    def _build_context(self, source_code: str, source_language: str | None, target_language: str) -> ContextBundle:
        inferred = normalize_language(source_language) if source_language else infer_language(source_code)
        target = normalize_language(target_language)
        if inferred == target:
            raise ValueError("Source and target languages must differ")
        if (inferred, target) not in SUPPORTED_PAIRS:
            raise ValueError(f"Unsupported language pair: {inferred} -> {target}")
        chunks = chunk_code(source_code)
        structure = extract_structure(source_code, inferred)
        structure_summary = f"Chunks: {len(chunks)} | Structure: {json.dumps(structure)}"
        return ContextBundle(source_language=inferred, target_language=target, structure_summary=structure_summary)

    def _find_run(self, source_code: str, migrated_code: str) -> MigrationRun | None:
        return (
            self.db.query(MigrationRun)
            .filter(MigrationRun.source_code == source_code, MigrationRun.migrated_code == migrated_code)
            .order_by(MigrationRun.created_at.desc())
            .first()
        )

    async def migrate(self, payload: MigrateRequest) -> MigrateResponse:
        context = self._build_context(payload.source_code, payload.source_language, payload.target_language)
        fallback = fallback_migration(payload.source_code, context.source_language, context.target_language, payload.migration_mode)
        prompt = build_migration_prompt(
            payload.source_code,
            context.source_language,
            context.target_language,
            payload.migration_mode,
            context.structure_summary,
        )
        raw = await self.openai.complete_json(prompt, fallback)
        normalized = {
            "migrated_code": str(raw.get("migrated_code", fallback["migrated_code"])),
            "summary": str(raw.get("summary", fallback["summary"])),
            "semantic_diff": [str(item) for item in raw.get("semantic_diff", fallback["semantic_diff"])],
            "notes": [str(item) for item in raw.get("notes", fallback["notes"])],
        }
        run = MigrationRun(
            source_language=context.source_language,
            target_language=context.target_language,
            migration_mode=payload.migration_mode,
            source_code=payload.source_code,
            migrated_code=normalized["migrated_code"],
            explanation="",
            semantic_diff="\n".join(f"- {item}" for item in normalized["semantic_diff"]),
            generated_tests="",
            validation_report_json="{}",
            optimization_report_json="{}",
            notes="\n".join(normalized["notes"]),
            status="completed",
            title=generate_title(payload.source_code, context.source_language, context.target_language),
        )
        self.db.add(run)
        self.db.commit()
        self.db.refresh(run)
        return MigrateResponse(run_id=run.id, **normalized)

    async def generate_tests(self, payload: GenerateTestsRequest) -> GenerateTestsResponse:
        fallback = fallback_tests(payload.migrated_code, payload.target_language)
        prompt = build_test_prompt(
            payload.source_code,
            payload.migrated_code,
            payload.source_language,
            payload.target_language,
        )
        raw = await self.openai.complete_json(prompt, fallback)
        response = GenerateTestsResponse(
            generated_tests=str(raw.get("generated_tests", fallback["generated_tests"])),
            test_strategy=[str(item) for item in raw.get("test_strategy", fallback["test_strategy"])],
        )
        run = self._find_run(payload.source_code, payload.migrated_code)
        if run:
            run.generated_tests = response.generated_tests
            self.db.commit()
        return response

    async def validate(self, payload: ValidateRequest) -> ValidateResponse:
        source_structure = extract_structure(payload.source_code, normalize_language(payload.source_language))
        target_structure = extract_structure(payload.migrated_code, normalize_language(payload.target_language))
        comparison = compare_structures(source_structure, target_structure)
        fallback = fallback_validation(comparison)
        prompt = build_validation_prompt(
            payload.source_code,
            payload.migrated_code,
            payload.source_language,
            payload.target_language,
            json.dumps(comparison),
        )
        raw = await self.openai.complete_json(prompt, fallback)
        response = ValidateResponse(
            validation_score=int(raw.get("validation_score", fallback["validation_score"])),
            confidence_level=str(raw.get("confidence_level", fallback["confidence_level"])),
            likely_equivalence=bool(raw.get("likely_equivalence", fallback["likely_equivalence"])),
            detected_risks=[str(item) for item in raw.get("detected_risks", fallback["detected_risks"])],
            edge_cases=[str(item) for item in raw.get("edge_cases", fallback["edge_cases"])],
            recommendations=[str(item) for item in raw.get("recommendations", fallback["recommendations"])],
            high_risk_differences=[
                str(item) for item in raw.get("high_risk_differences", fallback["high_risk_differences"])
            ],
            missing_functionality_warnings=[
                str(item)
                for item in raw.get("missing_functionality_warnings", fallback["missing_functionality_warnings"])
            ],
            manual_review_points=[
                str(item) for item in raw.get("manual_review_points", fallback["manual_review_points"])
            ],
        )
        run = self._find_run(payload.source_code, payload.migrated_code)
        if run:
            run.validation_report_json = response.model_dump_json()
            self.db.commit()
        return response

    async def explain(self, payload: ExplainRequest) -> ExplainResponse:
        fallback = fallback_explanation(payload.source_language, payload.target_language)
        prompt = build_explanation_prompt(
            payload.source_code,
            payload.migrated_code,
            payload.source_language,
            payload.target_language,
        )
        raw = await self.openai.complete_json(prompt, fallback)
        response = ExplainResponse(
            explanation=str(raw.get("explanation", fallback["explanation"])),
            architectural_changes=[
                str(item) for item in raw.get("architectural_changes", fallback["architectural_changes"])
            ],
            syntax_changes=[str(item) for item in raw.get("syntax_changes", fallback["syntax_changes"])],
            runtime_considerations=[
                str(item) for item in raw.get("runtime_considerations", fallback["runtime_considerations"])
            ],
        )
        run = self._find_run(payload.source_code, payload.migrated_code)
        if run:
            run.explanation = response.explanation
            self.db.commit()
        return response

    async def optimize(self, payload: OptimizeRequest) -> OptimizeResponse:
        fallback = fallback_optimization(payload.migrated_code, payload.target_language)
        prompt = build_optimization_prompt(payload.migrated_code, payload.target_language)
        raw = await self.openai.complete_json(prompt, fallback)
        response = OptimizeResponse(
            optimized_code=str(raw.get("optimized_code", fallback["optimized_code"])),
            optimization_notes=[str(item) for item in raw.get("optimization_notes", fallback["optimization_notes"])],
            complexity_notes=[str(item) for item in raw.get("complexity_notes", fallback["complexity_notes"])],
        )
        run = (
            self.db.query(MigrationRun)
            .filter(MigrationRun.migrated_code == payload.migrated_code)
            .order_by(MigrationRun.created_at.desc())
            .first()
        )
        if run:
            run.optimization_report_json = response.model_dump_json()
            self.db.commit()
        return response
