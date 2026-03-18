def build_validation_prompt(
    source_code: str,
    migrated_code: str,
    source_language: str,
    target_language: str,
    structure_comparison: str,
) -> str:
    return f"""
You are validating whether a migration from {source_language} to {target_language} preserved behavior.
Use the provided structural comparison as grounding and identify uncertainty.
Return JSON with:
- validation_score: integer
- confidence_level: string
- likely_equivalence: boolean
- detected_risks: list[str]
- edge_cases: list[str]
- recommendations: list[str]
- high_risk_differences: list[str]
- missing_functionality_warnings: list[str]
- manual_review_points: list[str]

Structural comparison:
{structure_comparison}

Source:
{source_code}

Migrated:
{migrated_code}
""".strip()
