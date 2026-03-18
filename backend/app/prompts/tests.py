def build_test_prompt(
    source_code: str,
    migrated_code: str,
    source_language: str,
    target_language: str,
) -> str:
    return f"""
You are generating tests for migrated code.
Base the tests on behavior implied by the {source_language} source and {target_language} migration.
Return JSON with:
- generated_tests: string
- test_strategy: list[str]

Source:
{source_code}

Migrated:
{migrated_code}
""".strip()
