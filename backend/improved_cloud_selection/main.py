from fastapi import FastAPI

from improved_cloud_selection.api import ping


def create_application() -> FastAPI:
    application = FastAPI(docs_url=None, redoc_url="/docs")
    application.include_router(ping.router)

    return application


app = create_application()
