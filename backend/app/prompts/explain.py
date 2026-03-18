def build_explanation_prompt(
    source_code: str,
    migrated_code: str,
    source_language: str,
    target_language: str,
) -> str:
    return f"""
You are a senior staff engineer explaining a code migration.
Compare the {source_language} source and the {target_language} migrated code.
Return JSON with:
- explanation: concise technical explanation
- architectural_changes: list[str]
- syntax_changes: list[str]
- runtime_considerations: list[str]

Source:
{source_code}

Migrated:
{migrated_code}
""".strip()
