import logging
import os
from functools import lru_cache

from pydantic import BaseSettings

log = logging.getLogger("uvicorn")


class Settings(BaseSettings):
    environment: str = os.getenv("ENVIRONMENT", "dev")
    testing: bool = bool(os.getenv("TESTING", False))
    cloud_provider_url: str = os.getenv("CLOUD_PROVIDER_URL", "https://api.aiven.io")
    geo_ip_provider_url: str = os.getenv(
        "GEO_IP_PROVIDER_URL", "https://geolocation-db.com/json"
    )


@lru_cache()
def get_settings() -> BaseSettings:
    log.info("Loading config settings from the environment...")
    return Settings()
