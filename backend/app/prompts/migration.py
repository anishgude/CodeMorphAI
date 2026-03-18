def build_migration_prompt(
    source_code: str,
    source_language: str,
    target_language: str,
    migration_mode: str,
    structure_summary: str,
) -> str:
    return f"""
You are an AI code migration engine.
Translate the provided {source_language} code into {target_language}.
Preserve semantics and mention uncertainties.
Migration mode: {migration_mode}.
If the mode implies idiomatic or performance improvements, remain behavior-safe.

Structure summary:
{structure_summary}

Return JSON with:
- migrated_code: string
- summary: string
- semantic_diff: list[str]
- notes: list[str]

Code:
{source_code}
""".strip()
