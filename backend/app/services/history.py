from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.models.migration_run import MigrationRun
from app.schemas.history import HistoryDetailResponse, HistoryListItem


class HistoryService:
    def __init__(self, db: Session):
        self.db = db

    def list_runs(self) -> list[HistoryListItem]:
        runs = self.db.query(MigrationRun).order_by(desc(MigrationRun.created_at)).limit(20).all()
        return [HistoryListItem.model_validate(run, from_attributes=True) for run in runs]

    def get_run(self, run_id: int) -> HistoryDetailResponse | None:
        run = self.db.query(MigrationRun).filter(MigrationRun.id == run_id).first()
        if not run:
            return None
        return HistoryDetailResponse.model_validate(run, from_attributes=True)
