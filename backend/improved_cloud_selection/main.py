import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_redis_cache import FastApiRedisCache

from improved_cloud_selection.api import clouds

LOCAL_FRONTEND_URL = "http://localhost:3000"
LOCAL_REDIS_URL = "redis://redis:6379/0"


def create_application() -> FastAPI:
    application = FastAPI(
        title="Improved cloud selection", docs_url=None, redoc_url="/docs"
    )
    application.include_router(clouds.router)
    application = add_cors_for_frontend(application)
    return application


def add_cors_for_frontend(application: FastAPI) -> FastAPI:
    frontend_url = os.getenv("FRONTEND_URL", LOCAL_FRONTEND_URL).split()
    application.add_middleware(
        CORSMiddleware,
        allow_origins=frontend_url,
        allow_methods=["GET"],
        allow_headers=["*"],
    )
    return application


app = create_application()


@app.on_event("startup")
def startup():
    redis_cache = FastApiRedisCache()
    redis_cache.init(
        host_url=os.getenv("REDIS_URL", LOCAL_REDIS_URL),
        prefix="improved-cloud-selection-cache",
        response_header="X-ImprovedCloudSelection-Cache",
    )
