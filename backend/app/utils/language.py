from pathlib import Path


ALIASES = {
    "py": "python",
    "python": "python",
    "js": "javascript",
    "jsx": "javascript",
    "ts": "typescript",
    "tsx": "typescript",
    "java": "java",
    "cpp": "cpp",
    "c++": "cpp",
    "cc": "cpp",
    "cs": "csharp",
    "go": "go",
    "rs": "rust",
}


def normalize_language(language: str) -> str:
    lowered = language.strip().lower()
    return ALIASES.get(lowered, lowered)


def infer_language(source_code: str, filename: str | None = None) -> str:
    if filename:
        suffix = Path(filename).suffix.lstrip(".").lower()
        if suffix in ALIASES:
            return ALIASES[suffix]

    stripped = source_code.strip()
    if "public static void main" in stripped or ("class " in stripped and "System.out" in stripped):
        return "java"
    if "#include" in stripped or "std::" in stripped:
        return "cpp"
    if "def " in stripped or ("import " in stripped and ":" in stripped):
        return "python"
    if "function " in stripped or "console.log" in stripped or "=>" in stripped:
        return "javascript"
    return "python"
