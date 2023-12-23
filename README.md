# Cheevo Engine: a proof-of-concept

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

## Implementing in production

The recommended approach is to use a message queue in front of the listener; that way you are able to control the pace and load on the API.

On AWS, this would look something along the lines of:

```
[webhook request]
    |
    V
API Gateway -> SQS -> Lambda
    ^
    |
    V
  authorizer lambda
```

To handle event bursts such as during Black Friday you should limit concurrency.

In addition to the infrastructural setup you will also need to modify the codebase:

* modify `index.ts` to react to incoming messages rather than using hardcoded payloads
* modify the authentication mechanism in `src/lib/whApi.ts` to have access to all users
* replace any console.log entries containing `✅` with code that actually awards the achievement
* replace any console.log entries containing `🚧` with code that stores progress
