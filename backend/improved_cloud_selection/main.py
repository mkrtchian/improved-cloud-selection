import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from improved_cloud_selection.api import clouds


def create_application() -> FastAPI:
    application = FastAPI(docs_url=None, redoc_url="/docs")
    application.include_router(clouds.router)
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    application.add_middleware(
        CORSMiddleware,
        allow_origins=[frontend_url],
        allow_methods=["GET"],
        allow_headers=["*"],
    )
    return application


app = create_application()
