import json

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.migration_run import MigrationRun


def seed_demo_runs() -> None:
    db: Session = SessionLocal()
    try:
        if db.query(MigrationRun).count() > 0:
            return
        run = MigrationRun(
            source_language="python",
            target_language="javascript",
            migration_mode="idiomatic rewrite",
            source_code="def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n",
            migrated_code="export function fib(n) {\n  if (n < 2) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n",
            explanation="Converted a recursive Python function into a direct JavaScript module export while preserving control flow.",
            semantic_diff="- Python implicit typing became JavaScript number semantics\n- Module export syntax replaces local function scope",
            generated_tests="import { fib } from './fib';\n\ndescribe('fib', () => {\n  it('returns base cases', () => {\n    expect(fib(0)).toBe(0);\n    expect(fib(1)).toBe(1);\n  });\n});\n",
            validation_report_json=json.dumps(
                {
                    "validation_score": 91,
                    "confidence_level": "high",
                    "likely_equivalence": True,
                    "detected_risks": ["Recursive performance remains exponential for large inputs"],
                }
            ),
            optimization_report_json=json.dumps(
                {
                    "optimization_notes": ["Memoization would improve repeated calls"],
                    "complexity_notes": ["Current time complexity remains exponential"],
                }
            ),
            notes="Seeded demo run",
            status="completed",
            title="Recursive Fibonacci to JavaScript",
        )
        db.add(run)
        db.commit()
    finally:
        db.close()
