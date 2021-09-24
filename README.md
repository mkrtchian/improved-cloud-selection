# Improved cloud selection

![Continuous Integration and Delivery](https://github.com/mkrtchian/improved-cloud-selection/workflows/Continuous%20Integration%20and%20Delivery/badge.svg?branch=main)

- The frontend is [available live on github pages](https://mkrtchian.github.io/improved-cloud-selection/).
- The backend is [available on Heroku](https://damp-fortress-19341.herokuapp.com/clouds), but the free Heroku instance sleeps when unused for 30 minutes, so the first request to the API may take 10 seconds until working normally.

## Features

- Displays the cloud instances information from the cloud provider.
- Works also well on mobile.
- Caches the provider's data in the backend for 10 minutes to avoid spamming the provider too much.
- Sorts the cloud instances by distance from the user, when the user location is known.
- Hides the cloud instances that are farther than the maximal distance indicated by the user, when the user location is known.
- The user location is known by two ways:
  - With an initial call to the backend, that calls an external service to get the location coordinates from the user IP address, and send them back to the frontend.
  - When the user uses the button to trigger the geo location browser interface, and provide his location.

## Quick install and run locally

### Requirements

- Docker Engine v20+
- Docker Compose v1.29+
- Node.js v16+
- yarn (could be installed with `npm install -g yarn`)

### Commands to get started

```bash
git clone https://github.com/mkrtchian/improved-cloud-selection.git
cd improved-cloud-selection.git/backend
docker-compose up -d --build
cd ../frontend
yarn install
yarn dev
```

- The frontend should be accessible on http://localhost:3000
- The backend should be accessible on http://localhost:8000

## Documentation

To install the development environment or deploy the application, please take a look at the [documentation files](docs/).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) if you would like to contribute to the project.

## Attribution

- The backend codebase has been inspired from the [testdriven.io tutorial on FastAPI](https://testdriven.io/courses/tdd-fastapi/).
- The frontend codebase has been bootstrapped with [create-next-app TypeScript/Eslint/Jest template](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-eslint-jest).
- Some code snippets or other ressources have been taken on different pages. They are indicated in the source code when being used.

## License

The license text can be found in the [LICENSE](LICENSE) file.
