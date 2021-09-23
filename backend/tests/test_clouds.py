import json

import pytest

from improved_cloud_selection.api import clouds

from .conftest import ResponseMock


@pytest.fixture()
def clouds_data() -> dict:
    with open("tests/data/clouds.json") as file:
        clouds = json.load(file)
    return clouds


def test_clouds_returns_error_when_external_services_returns_error_status(
    test_app, clouds_data, monkeypatch
):
    def mock_make_request(_: str):
        data_with_errors = dict(clouds_data)
        data_with_errors["errors"] = ["There was an error..."]
        return ResponseMock(200, data_with_errors)

    monkeypatch.setattr(clouds, "make_request", mock_make_request)

    response = test_app.get("/clouds")
    assert response.status_code == 500
    response = response.json()
    assert "clouds" not in response
    assert response["detail"] == "An unexpected error happened with our cloud provider."


def test_clouds_returns_error_when_external_services_sends_back_error_message(
    test_app, clouds_data, monkeypatch
):
    def mock_make_request(_: str):
        return ResponseMock(400, clouds_data)

    monkeypatch.setattr(clouds, "make_request", mock_make_request)

    response = test_app.get("/clouds")
    assert response.status_code == 500
    response = response.json()
    assert "clouds" not in response
    assert response["detail"] == "An unexpected error happened with our cloud provider."


def test_clouds_returns_transformed_already_existing_data(
    test_app, clouds_data, monkeypatch
):
    def mock_make_request(_: str):
        return ResponseMock(200, clouds_data)

    monkeypatch.setattr(clouds, "make_request", mock_make_request)

    response = test_app.get("/clouds")
    assert response.status_code == 200
    response_content = response.json()["clouds"]
    assert len(response_content) == 102
    assert (
        response_content[0]["cloud_description"]
        == "Africa, South Africa - Amazon Web Services: Cape Town"
    )
    assert response_content[0]["cloud_name"] == "aws-af-south-1"


def test_clouds_transformes_data_that_already_existed(
    test_app, clouds_data, monkeypatch
):
    def mock_make_request(_: str):
        return ResponseMock(200, clouds_data)

    monkeypatch.setattr(clouds, "make_request", mock_make_request)

    response = test_app.get("/clouds")
    assert response.status_code == 200
    response_content = response.json()["clouds"]
    assert len(response_content) == 102
    assert response_content[0]["latitude"] == -33.92
    assert response_content[0]["longitude"] == 18.42
    assert "geo_region" not in response_content[0]
    assert "geo_longitude" not in response_content[0]
    assert "geo_latitude" not in response_content[0]


def test_clouds_returns_correct_cloud_provider(test_app, clouds_data, monkeypatch):
    def mock_make_request(_: str):
        return ResponseMock(200, clouds_data)

    monkeypatch.setattr(clouds, "make_request", mock_make_request)

    response = test_app.get("/clouds")
    assert response.status_code == 200
    response_content = response.json()["clouds"]
    assert response_content[0]["cloud_provider"] == "Amazon Web Services"
    assert response_content[1]["cloud_provider"] == "Microsoft Azure"
    assert response_content[5]["cloud_provider"] == "Google Cloud Platform"
    assert response_content[10]["cloud_provider"] == "DigitalOcean"
    assert response_content[27]["cloud_provider"] == "UpCloud"
    assert response_content[101]["cloud_provider"] == "Unknown"


def test_clouds_returns_correct_cloud_regions(test_app, clouds_data, monkeypatch):
    def mock_make_request(_: str):
        return ResponseMock(200, clouds_data)

    monkeypatch.setattr(clouds, "make_request", mock_make_request)

    response = test_app.get("/clouds")
    assert response.status_code == 200
    response_content = response.json()["clouds"]
    assert response_content[0]["cloud_region"] == "Africa"
    assert response_content[2]["cloud_region"] == "Asia"
    assert response_content[29]["cloud_region"] == "Australia"
    assert response_content[36]["cloud_region"] == "Canada"
    assert response_content[42]["cloud_region"] == "Europe"
    assert response_content[74]["cloud_region"] == "South America"
    assert response_content[77]["cloud_region"] == "United States"
