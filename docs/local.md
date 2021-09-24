# Local installation

## Requirements

The local environment needs the following tools:

- Docker Engine v20+
- Docker Compose v1.29+
- Python v3.9+
- Node.js v16+

## Install development environment

To begin, you have to clone the repository locally:

```bash
git clone https://github.com/mkrtchian/improved-cloud-selection.git
```

Then you can install the python `pre-commit` package and install the git pre commit hooks, to ensure the code you commit is linted:

```bash
pip install pre-commit
# in the project folder
pre-commit install
```

## Backend

You can either develop locally with docker, or without docker if you don't need Redis or would like to install and run it yourself. In that case you will need to install the python package `poetry` first.

### Run the development server

To run the backend with docker:

```bash
docker-compose up --build
```

To run it without docker:

```bash
poetry install -d
poetry run uvicorn improved_cloud_selection.main:app --reload --workers 1 --host 0.0.0.0 --port 8000
```

### Run the production server

The production docker images can be run with:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

The `docker-compose.prod.yml` file is currently only used for end to end tests and to run the production containers locally. The production deployment is done without docker-compose.

### Testing and linting

To run all unit tests and linting tools, you can run the script file in the `backend` folder:

```bash
chmod +x test_all.sh
./test_all.sh
```

That file contains actually all the individual commands that can be run:

```bash
poetry run flake8 . # for code linting
poetry run mypy . # for static type checking
poetry run black --check . # for code style checking
poetry run isort . # for imports style checking
poetry run pytest # for unit tests
```

You can also build and start the docker image, and run all these through docker instead:

```bash
docker-compose up -d --build
docker-compose run web poetry run flake8 . # for code linting
docker-compose run web poetry run mypy . # for static type checking
docker-compose run web poetry run black --check . # for code style checking
docker-compose run web poetry run isort . # for imports style checking
docker-compose run web poetry run pytest # for unit tests
```

## Frontend

You need to have `yarn` installed to run the frontend commands:

```bash
npm install -g yarn
```

### Run the development server

To run the frontend you need to install and run the development server of Next.js:

```bash
yarn install
yarn dev
```

### Run the production server

The production version of the frontend can be run with Next.js commands:

```bash
yarn build
yarn start
```

### Testing and linting

To run all unit tests and linting tools, you can run the following command:

```bash
yarn test-all
```

Which corresponds to these commands run one by one:

```bash
yarn lint # for linting
yarn type-check # for static type checking
yarn format-check # for style checking
yarn test # for unit testing
```

## End to end tests

The end to end tests are currently located in the frontend directory, and are using CodeceptJS.

To run the frontend you need also to install `pm2`:

```bash
npm install -g pm2
```

To avoid conflicting with the development backend/frontend servers, the docker instance for the backend will be started by default on port 8001 and the frontend will be started on port 3001.

The tests can be run with:

```bash
yarn e2e
```
