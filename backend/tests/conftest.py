import pytest
from improved_cloud_selection.config import Settings, get_settings
from improved_cloud_selection.main import create_application
from starlette.testclient import TestClient


def get_settings_override():
    return Settings(testing=1)


@pytest.fixture(scope="module")
def test_app():
    # set up
    app = create_application()
    app.dependency_overrides[get_settings] = get_settings_override
    with TestClient(app) as test_client:

        # testing
        yield test_client

    # tear down
