import logging

import requests
from fastapi import APIRouter, Depends, HTTPException, Request

from improved_cloud_selection.config import Settings, get_settings

router = APIRouter()

log = logging.getLogger("uvicorn")


@router.get("/geo-coordinates")
def geo_coordinates(request: Request, settings: Settings = Depends(get_settings)):
    """Geo coordinates of the user making the request, from his IP.

    Args:
        request: the incoming request.
        settings: the main settings.

    Returns:
        The data from the geo ip provider, with only longitude and latitude.

    Raises:
        HTTPException: in the case where the provider replies with an error.

    """  # noqa: DAR402
    response = make_request(f"{settings.geo_ip_provider_url}/{request.client.host}")
    check_response_status(response)
    geo_data = response.json()
    result_data = {}
    result_data["longitude"] = geo_data["longitude"]
    result_data["latitude"] = geo_data["latitude"]
    result_data["ip"] = request.client.host
    result_data["headers"] = request.headers
    return result_data


def make_request(url: str):
    return requests.get(url)


def check_response_status(response):
    if response.status_code >= 400:
        raise HTTPException(
            status_code=500,
            detail="An unexpected error happened with our geo coordinates provider.",
        )
