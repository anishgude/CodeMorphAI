from fastapi.testclient import TestClient

from app.db.session import Base, engine
from app.main import app

Base.metadata.create_all(bind=engine)

client = TestClient(app)


def test_health() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_migrate_python_to_javascript() -> None:
    response = client.post(
        "/api/migrate",
        json={
            "source_code": "def fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n",
            "source_language": "python",
            "target_language": "javascript",
            "migration_mode": "direct translation",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "migrated_code" in data
    assert data["run_id"] > 0
