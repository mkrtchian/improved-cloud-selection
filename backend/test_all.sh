#!/bin/sh

poetry run flake8 .
poetry run mypy .
poetry run black --check .
poetry run isort .
poetry run pytest
