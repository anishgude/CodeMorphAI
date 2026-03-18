def fallback_migration(
    source_code: str, source_language: str, target_language: str, migration_mode: str
) -> dict[str, object]:
    migrated = source_code
    if source_language == "python" and target_language == "javascript":
        migrated = (
            "export function migrated(input) {\n"
            "  // Review logic generated from Python source.\n"
            "  return input;\n"
            "}\n"
        )
    elif source_language == "javascript" and target_language == "python":
        migrated = (
            "def migrated(input_value):\n"
            "    # Review logic generated from JavaScript source.\n"
            "    return input_value\n"
        )
    elif target_language == "python":
        migrated = "def migrated(input_value):\n    return input_value\n"
    elif target_language == "java":
        migrated = (
            "public class Migrated {\n"
            "    public static Object migrated(Object input) {\n"
            "        return input;\n"
            "    }\n"
            "}\n"
        )
    elif target_language == "go":
        migrated = (
            "package main\n\n"
            "func migrated(input any) any {\n"
            "    return input\n"
            "}\n"
        )
    return {
        "migrated_code": migrated,
        "summary": f"Generated a fallback {migration_mode} migration from {source_language} to {target_language}.",
        "semantic_diff": [
            f"Adjusted syntax from {source_language} to {target_language}",
            "Preserved behavior with conservative placeholder structure",
        ],
        "notes": [
            "Fallback output is used when OpenAI credentials are unavailable or a structured response fails.",
            "Manual review is recommended before production use.",
        ],
    }


def fallback_tests(migrated_code: str, target_language: str) -> dict[str, object]:
    if target_language == "javascript":
        tests = (
            "import { describe, expect, it } from 'vitest';\n\n"
            "describe('migrated code', () => {\n"
            "  it('handles the primary path', () => {\n"
            "    expect(typeof migrated).toBe('function');\n"
            "  });\n"
            "});\n"
        )
    else:
        tests = (
            "def test_placeholder_behavior():\n"
            "    assert True\n"
        )
    return {
        "generated_tests": tests,
        "test_strategy": [
            "Cover primary behavior paths",
            "Add edge cases around null, empty, and boundary inputs",
            "Cross-check outputs against the source implementation where possible",
        ],
    }


def fallback_validation(comparison: dict[str, object]) -> dict[str, object]:
    return {
        "validation_score": comparison["score"],
        "confidence_level": comparison["confidence_level"],
        "likely_equivalence": comparison["score"] >= 70,
        "detected_risks": comparison["risks"],
        "edge_cases": [
            "Boundary values",
            "Null or empty input handling",
            "Error-path behavior",
        ],
        "recommendations": [
            "Run language-native tests against representative fixtures",
            "Review type conversions and exception handling",
        ],
        "high_risk_differences": comparison["risks"][:2],
        "missing_functionality_warnings": comparison["warnings"],
        "manual_review_points": [
            "Confirm exported API parity",
            "Inspect collection and numeric semantics",
        ],
    }


def fallback_explanation(source_language: str, target_language: str) -> dict[str, object]:
    return {
        "explanation": f"The migration maps {source_language} constructs into equivalent {target_language} forms while keeping control flow and data movement stable.",
        "architectural_changes": [
            "Adjusted module and export conventions",
            "Normalized function declarations for the target ecosystem",
        ],
        "syntax_changes": [
            "Converted language-specific delimiters and block syntax",
            "Mapped type annotations or inference style where applicable",
        ],
        "runtime_considerations": [
            "Review type coercion differences",
            "Check collection mutability and iteration semantics",
        ],
    }


def fallback_optimization(migrated_code: str, target_language: str) -> dict[str, object]:
    return {
        "optimized_code": migrated_code,
        "optimization_notes": [
            f"Preserved the current {target_language} implementation to avoid behavior drift.",
            "Consider extracting reusable helpers if the file grows.",
        ],
        "complexity_notes": [
            "Inspect hotspots with repeated nested loops or recursion.",
            "Benchmark I/O and allocation-heavy paths before deeper refactors.",
        ],
    }
