from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.migration import MigrateRequest, MigrateResponse
from app.services.migration import MigrationService

router = APIRouter()


@router.post("/migrate", response_model=MigrateResponse)
async def migrate_code(payload: MigrateRequest, db: Session = Depends(get_db)) -> MigrateResponse:
    service = MigrationService(db)
    try:
        return await service.migrate(payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
