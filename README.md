# ams-crawler

A job search app for full-stack developer roles in Vienna. It scrapes the job portal of the Austrian employment service (AMS) and shows the listings as swipeable cards in a mobile web app.

## How it works

1. A Node.js scraper uses Playwright to open the AMS job portal, search for full-stack jobs in Vienna and walk through every result page
2. The Spring Boot backend starts the scraper as a separate process, reads its JSON output and stores the jobs in PostgreSQL
3. A scheduled job runs the crawl twice a day, and a refresh button in the app triggers it on demand
4. The Vue app shows one job at a time. You skip it or save it for later, and saved jobs are kept on the device

## Design decisions

- **Java and Node talk through stdout.** The scraper prints only JSON to stdout and sends logs to stderr, so the backend can parse the result without mixing in debug output.
- **The portal is a single-page app.** Playwright renders the JavaScript and waits for the URL to change before reading the next page, instead of relying on fixed timeouts.
- **One container setup for everything.** Docker Compose runs PostgreSQL, the backend (with Java, Node and Chromium in one image) and Caddy, which serves the frontend and forwards `/api` to the backend, so there is no CORS setup.

## Stack

- **Backend:** Java 25, Spring Boot, Spring Data JPA, PostgreSQL, Flyway
- **Scraper:** Node.js, TypeScript, Playwright
- **Frontend:** Vue 3, TypeScript, Pinia, Tailwind CSS, installable as a PWA
- **Deployment:** Docker, Docker Compose, Caddy

## Running locally

Requirements: Docker.

```bash
docker compose up -d --build
```

The app runs on http://localhost. Press the refresh button to run the first crawl.
