# Proof-of-concept: eventdriven WH cheevos

## Setup

```
nvm use 20
npm ci
```

## Running locally

Copy `.env.example` to `.env` and modify the values

```
npx tsx --env-file .env index.ts
```

## Environment variables

* `WHAPI_BASE_URL`
* `WHAPI_TOKEN` - equivalent to the `webhallen_auth` cookie
