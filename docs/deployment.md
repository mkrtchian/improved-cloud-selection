# Deployment

The current deployement is done on Heroku for the backend and Github pages for the frontend.

## Backend

The backend docker image is deployed to Heroku with the CI job. What is currently deployed is the image built from `Dockerfile.prod`, whereas the Redis instance is provided as a Heroku plugin.

The deployement can be done manually like this (after installing [the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)):

```bash
heroku container:login
docker build -f backend/Dockerfile.prod -t registry.heroku.com/damp-fortress-19341/web ./backend
docker push registry.heroku.com/damp-fortress-19341/web:latest
heroku container:release web --app damp-fortress-19341
```

## Frontend

The frontend is currently built with Next.js integrated tools to a fully static bundle, and uploaded to github pages with `gh-pages` npm package.

The deployement is done in the CI, but can be done manually with:

```bash
yarn deploy
```
