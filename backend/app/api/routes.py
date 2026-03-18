from fastapi import APIRouter

from app.api.v1 import explain, health, history, migrate, optimize, tests, validate

router = APIRouter(prefix="/api")
router.include_router(health.router, tags=["health"])
router.include_router(migrate.router, tags=["migrate"])
router.include_router(tests.router, tags=["tests"])
router.include_router(validate.router, tags=["validate"])
router.include_router(explain.router, tags=["explain"])
router.include_router(optimize.router, tags=["optimize"])
router.include_router(history.router, tags=["history"])
