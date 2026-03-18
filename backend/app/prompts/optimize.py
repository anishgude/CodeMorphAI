def build_optimization_prompt(migrated_code: str, target_language: str) -> str:
    return f"""
You are optimizing migrated {target_language} code.
Suggest safe, behavior-preserving refinements unless explicitly noted.
Return JSON with:
- optimized_code: string
- optimization_notes: list[str]
- complexity_notes: list[str]

Code:
{migrated_code}
""".strip()
