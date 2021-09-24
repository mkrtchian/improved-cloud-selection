import pytest

from improved_cloud_selection.api import geo_coordinates

from .conftest import ResponseMock


@pytest.fixture()
def geo_data() -> dict:
    return {"longitude": 25.32, "latitude": -3.74, "other_data": "blablabla"}


def test_geo_coordinates_returns_the_correct_coordinates(
    test_app, geo_data, monkeypatch
):
    def mock_make_request(_: str):
        return ResponseMock(200, geo_data)

    monkeypatch.setattr(geo_coordinates, "make_request", mock_make_request)

    response = test_app.get("/geo-coordinates")
    assert response.status_code == 200
    assert response.json() == {"longitude": 25.32, "latitude": -3.74}


def test_geo_coordinates_returns_error_when_external_services_errors(
    test_app, geo_data, monkeypatch
):
    def mock_make_request(_: str):
        return ResponseMock(400, geo_data)

    monkeypatch.setattr(geo_coordinates, "make_request", mock_make_request)

    response = test_app.get("/geo-coordinates")
    assert response.status_code == 500
    response = response.json()
    assert (
        response["detail"]
        == "An unexpected error happened with our geo coordinates provider."
    )
