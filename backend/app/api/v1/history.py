from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.history import HistoryDetailResponse, HistoryListItem
from app.services.history import HistoryService

router = APIRouter()


@router.get("/history", response_model=list[HistoryListItem])
async def list_history(db: Session = Depends(get_db)) -> list[HistoryListItem]:
    return HistoryService(db).list_runs()


@router.get("/history/{run_id}", response_model=HistoryDetailResponse)
async def get_history(run_id: int, db: Session = Depends(get_db)) -> HistoryDetailResponse:
    item = HistoryService(db).get_run(run_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Run not found")
    return item
