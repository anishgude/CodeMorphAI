from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.migration import GenerateTestsRequest, GenerateTestsResponse
from app.services.migration import MigrationService

router = APIRouter()


@router.post("/generate-tests", response_model=GenerateTestsResponse)
async def generate_tests(
    payload: GenerateTestsRequest, db: Session = Depends(get_db)
) -> GenerateTestsResponse:
    return await MigrationService(db).generate_tests(payload)
