def chunk_code(source_code: str, chunk_size: int = 2200) -> list[str]:
    if len(source_code) <= chunk_size:
        return [source_code]
    return [source_code[index : index + chunk_size] for index in range(0, len(source_code), chunk_size)]
