from datetime import timedelta
from typing import List, Optional

import requests
from fastapi import APIRouter, Depends, HTTPException
from fastapi_redis_cache import cache
from pydantic import BaseModel

from improved_cloud_selection.config import Settings, get_settings

router = APIRouter()


class Cloud(BaseModel):
    cloud_description: str
    cloud_name: str
    latitude: float
    longitude: float
    cloud_region: str
    cloud_provider: str


class CloudsResponse(BaseModel):
    clouds: Optional[List[Cloud]]
    detail: Optional[str]


@router.get("/clouds", response_model=CloudsResponse)
@cache(expire=timedelta(minutes=10))
def clouds(settings: Settings = Depends(get_settings)):
    """Clouds data for enhanced selection.

    The data is queried from the provider, enriched with two fields by cloud
    data and cached in redis to avoid overloading the provider.

    Args:
        settings: the main settings.

    Returns:
        The data from the provider, with cloud providers and cloud regions.

    Raises:
        HTTPException: in the case where the provider replies with an error.

    """  # noqa: DAR402
    response = make_request(f"{settings.cloud_provider_url}/v1/clouds")
    clouds_data = response.json()
    check_response_status(response, clouds_data)
    clouds_data["clouds"] = transform_and_add_data(clouds_data["clouds"])
    return clouds_data


def make_request(url: str):
    return requests.get(url)


def check_response_status(response, clouds_data):
    error_message = "An unexpected error happened with our cloud provider."
    errors_in_response = "errors" in clouds_data and len(clouds_data["errors"]) > 0
    if response.status_code >= 400 or errors_in_response:
        raise HTTPException(
            status_code=500,
            detail=error_message,
        )


def transform_and_add_data(clouds_data: list) -> list:
    for cloud in clouds_data:
        add_cloud_provider(cloud)
        add_cloud_region(cloud)
        rename_cloud_coordinates(cloud)
    return clouds_data


def add_cloud_provider(cloud: dict):
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


def add_cloud_region(cloud: dict):
    cloud["cloud_region"] = cloud["cloud_description"].split(",")[0]


def rename_cloud_coordinates(cloud: dict):
    cloud["longitude"] = cloud["geo_longitude"]
    cloud["latitude"] = cloud["geo_latitude"]
