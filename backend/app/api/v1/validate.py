from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.migration import ValidateRequest, ValidateResponse
from app.services.migration import MigrationService

router = APIRouter()


@router.post("/validate", response_model=ValidateResponse)
async def validate_migration(
    payload: ValidateRequest, db: Session = Depends(get_db)
) -> ValidateResponse:
    return await MigrationService(db).validate(payload)
