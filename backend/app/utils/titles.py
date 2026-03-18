def generate_title(source_code: str, source_language: str, target_language: str) -> str:
    first_line = next((line.strip() for line in source_code.splitlines() if line.strip()), "Code migration")
    trimmed = first_line[:48]
    return f"{trimmed} ({source_language} -> {target_language})"
