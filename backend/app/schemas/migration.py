from pydantic import BaseModel, Field, model_validator


class MigrateRequest(BaseModel):
    source_code: str = Field(min_length=1)
    source_language: str | None = None
    target_language: str
    migration_mode: str = "direct translation"

    @model_validator(mode="after")
    def validate_languages(self) -> "MigrateRequest":
        if self.source_language and self.source_language.lower() == self.target_language.lower():
            raise ValueError("Source and target languages must differ")
        return self


class MigrateResponse(BaseModel):
    migrated_code: str
    summary: str
    semantic_diff: list[str]
    notes: list[str]
    run_id: int


class GenerateTestsRequest(BaseModel):
    source_code: str
    migrated_code: str
    source_language: str
    target_language: str


class GenerateTestsResponse(BaseModel):
    generated_tests: str
    test_strategy: list[str]


class ValidateRequest(BaseModel):
    source_code: str
    migrated_code: str
    source_language: str
    target_language: str


class ValidateResponse(BaseModel):
    validation_score: int
    confidence_level: str
    likely_equivalence: bool
    detected_risks: list[str]
    edge_cases: list[str]
    recommendations: list[str]
    high_risk_differences: list[str]
    missing_functionality_warnings: list[str]
    manual_review_points: list[str]


class ExplainRequest(BaseModel):
    source_code: str
    migrated_code: str
    source_language: str
    target_language: str


class ExplainResponse(BaseModel):
    explanation: str
    architectural_changes: list[str]
    syntax_changes: list[str]
    runtime_considerations: list[str]


class OptimizeRequest(BaseModel):
    migrated_code: str
    target_language: str


class OptimizeResponse(BaseModel):
    optimized_code: str
    optimization_notes: list[str]
    complexity_notes: list[str]
