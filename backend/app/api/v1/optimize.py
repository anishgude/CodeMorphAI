from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.migration import OptimizeRequest, OptimizeResponse
from app.services.migration import MigrationService

router = APIRouter()


@router.post("/optimize", response_model=OptimizeResponse)
async def optimize_code(payload: OptimizeRequest, db: Session = Depends(get_db)) -> OptimizeResponse:
    return await MigrationService(db).optimize(payload)
