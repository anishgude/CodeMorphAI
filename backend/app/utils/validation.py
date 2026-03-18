def compare_structures(
    source_structure: dict[str, list[str] | int], target_structure: dict[str, list[str] | int]
) -> dict[str, object]:
    source_functions = set(source_structure.get("functions", []))
    target_functions = set(target_structure.get("functions", []))
    source_classes = set(source_structure.get("classes", []))
    target_classes = set(target_structure.get("classes", []))

    missing_functions = sorted(source_functions - target_functions)
    missing_classes = sorted(source_classes - target_classes)
    risks = []
    warnings = []

    if missing_functions:
        risks.append(f"Functions missing in target: {', '.join(missing_functions)}")
        warnings.append("One or more source functions were not detected in the target structure")
    if missing_classes:
        risks.append(f"Classes missing in target: {', '.join(missing_classes)}")
        warnings.append("One or more source classes were not detected in the target structure")

    score = max(50, 100 - 15 * len(missing_functions) - 20 * len(missing_classes))
    confidence = "high" if score >= 85 else "medium" if score >= 70 else "low"
    if not risks:
        risks.append("No major structural mismatches detected; semantic review still recommended")

    return {
        "score": score,
        "confidence_level": confidence,
        "risks": risks,
        "warnings": warnings or ["No structural omissions detected"],
    }
