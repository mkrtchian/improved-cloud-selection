from fastapi import APIRouter, Depends
from improved_cloud_selection.config import Settings, get_settings

router = APIRouter()


@router.get("/ping")
async def pong(settings: Settings = Depends(get_settings)):
    return {
        "ping": "pong",
        "testing": settings.testing,
    }
