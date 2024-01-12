# Url shortner

## Description

This is a simple url shortner that uses a postgres database to store the urls and their shortened versions.

## Setup

1. Clone the repo
2. Start postgres using `docker run -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres`
3. Install dependencies using `pnpm install`


## Running the API
- Start the server in dev mode using `start:dev`

## Running the tests
- Run the tests using `pnpm vitest`

## Running title update job
- Run the title update job using `pnpm update-titles`


## Endpoints

### POST /shorten
```json
{
  "url": "https://google.com"
}
```

```json
{
  "shorten": "83jeehb"
}
```

### GET /[shorten]
redirect to the full url

### GET /top
```json
[
  {
    "url": "https://google.com",
    "title": "Google"
  },
  {
    "url": "https://youtube.com",
    "title": "YouTube"
  }
]
```