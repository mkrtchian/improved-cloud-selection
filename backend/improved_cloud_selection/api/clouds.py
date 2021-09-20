from datetime import timedelta

import requests
from fastapi import APIRouter, Depends, HTTPException
from fastapi_redis_cache import cache

from improved_cloud_selection.config import Settings, get_settings

router = APIRouter()


@router.get("/clouds")
@cache(expire=timedelta(minutes=10))
async def clouds(settings: Settings = Depends(get_settings)):
    """Clouds data for enhanced selection.

    The data is queried from the provider, enriched with two fields by cloud
    data and cached in redis to avoid overloading the provider.

    Args:
        settings: the main settings.

    Returns:
        The data from the provider, with cloud providers and cloud regions.

    Raises:
        HTTPException: in the case where the provider replies with an error.

    """
    clouds_data = make_request(f"{settings.provider_url}/v1/clouds")
    is_errors = "errors" in clouds_data and len(clouds_data["errors"]) > 0
    if is_errors:
        raise HTTPException(
            status_code=500,
            detail="An unexpected error happened with one of our providers.",
        )
    clouds_data["clouds"] = add_cloud_provider(clouds_data["clouds"])
    clouds_data["clouds"] = add_cloud_region(clouds_data["clouds"])
    return clouds_data


def make_request(url: str):
    response = requests.get(url)
    if response.status_code >= 400:
        raise HTTPException(
            status_code=500,
            detail="An unexpected error happened with one of our providers.",
        )
    return response.json()


def add_cloud_provider(clouds_data: list) -> list:
    for cloud in clouds_data:
        if "Amazon" in cloud["cloud_description"]:
            cloud["cloud_provider"] = "Amazon Web Services"
        elif "Azure" in cloud["cloud_description"]:
            cloud["cloud_provider"] = "Microsoft Azure"
        elif "Google" in cloud["cloud_description"]:
            cloud["cloud_provider"] = "Google Cloud Platform"
        elif "DigitalOcean" in cloud["cloud_description"]:
            cloud["cloud_provider"] = "DigitalOcean"
        elif "UpCloud" in cloud["cloud_description"]:
            cloud["cloud_provider"] = "UpCloud"
        else:
            cloud["cloud_provider"] = "Unknown"
    return clouds_data


def add_cloud_region(clouds_data: list) -> list:
    for cloud in clouds_data:
        cloud["cloud_region"] = cloud["cloud_description"].split(",")[0]
    return clouds_data
