from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.migration import ExplainRequest, ExplainResponse
from app.services.migration import MigrationService

router = APIRouter()


@router.post("/explain", response_model=ExplainResponse)
async def explain_migration(payload: ExplainRequest, db: Session = Depends(get_db)) -> ExplainResponse:
    return await MigrationService(db).explain(payload)
