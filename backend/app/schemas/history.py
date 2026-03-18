from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class HistoryListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    source_language: str
    target_language: str
    migration_mode: str
    title: str
    status: str


class HistoryDetailResponse(HistoryListItem):
    source_code: str
    migrated_code: str
    explanation: str
    semantic_diff: str
    generated_tests: str
    validation_report_json: str
    optimization_report_json: str
    notes: str
