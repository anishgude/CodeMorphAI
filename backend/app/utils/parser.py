import ast
import re


def extract_structure(source_code: str, language: str) -> dict[str, list[str] | int]:
    if language == "python":
        try:
            tree = ast.parse(source_code)
            functions = [node.name for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)]
            classes = [node.name for node in ast.walk(tree) if isinstance(node, ast.ClassDef)]
            return {"functions": functions, "classes": classes, "lines": len(source_code.splitlines())}
        except SyntaxError:
            pass

    function_patterns = {
        "javascript": r"(?:function\s+([A-Za-z_]\w*)|const\s+([A-Za-z_]\w*)\s*=\s*\()",
        "java": r"(?:public|private|protected)?\s+(?:static\s+)?[\w<>\[\]]+\s+([A-Za-z_]\w*)\s*\(",
        "cpp": r"(?:[\w:<>]+\s+)+([A-Za-z_]\w*)\s*\(",
        "go": r"func\s+([A-Za-z_]\w*)\s*\(",
    }
    class_patterns = {
        "javascript": r"class\s+([A-Za-z_]\w*)",
        "java": r"class\s+([A-Za-z_]\w*)",
        "cpp": r"class\s+([A-Za-z_]\w*)",
    }
    functions = []
    for match in re.findall(function_patterns.get(language, r"$^"), source_code):
        if isinstance(match, tuple):
            functions.extend([item for item in match if item])
        else:
            functions.append(match)
    classes = re.findall(class_patterns.get(language, r"$^"), source_code)
    return {"functions": functions, "classes": classes, "lines": len(source_code.splitlines())}
