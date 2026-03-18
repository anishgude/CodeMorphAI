# API Documentation

Base URL:

- `http://localhost:8000`

## Health

### `GET /api/health`

Returns backend liveness.

```json
{
  "status": "ok"
}
```

## Migrate

### `POST /api/migrate`

Request:

```json
{
  "source_code": "def fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n",
  "source_language": "python",
  "target_language": "javascript",
  "migration_mode": "idiomatic rewrite"
}
```

Response shape:

```json
{
  "migrated_code": "export function fib(n) { ... }",
  "summary": "Technical summary of the migration",
  "semantic_diff": ["..."],
  "notes": ["..."],
  "run_id": 1
}
```

## Generate Tests

### `POST /api/generate-tests`

Request:

```json
{
  "source_code": "def fib(n): ...",
  "migrated_code": "export function fib(n) { ... }",
  "source_language": "python",
  "target_language": "javascript"
}
```

Response shape:

```json
{
  "generated_tests": "test code here",
  "test_strategy": ["edge case coverage", "base case coverage"]
}
```

## Validate

### `POST /api/validate`

Returns validation score, confidence, equivalence signal, risks, edge cases, and review recommendations.

## Explain

### `POST /api/explain`

Returns:

- explanation
- architectural changes
- syntax changes
- runtime considerations

## Optimize

### `POST /api/optimize`

Returns:

- optimized code
- optimization notes
- complexity notes

## History

### `GET /api/history`

Returns recent stored runs.

### `GET /api/history/{run_id}`

Returns one run and its stored artifacts.

## Notes

- The backend supports a deterministic fallback mode when the OpenAI client is unavailable or a request fails.
- Supported migration pairs are currently defined in `backend/app/services/migration.py`.
