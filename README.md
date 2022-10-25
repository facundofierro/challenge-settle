## Settle challenge.

This is a sample application taking in account the requirements described at the end of the document.

Some not done features:
- The code coverage is not completed and not all use cases are covered
- Errors management should be improved

### Installation
Step by step installation explanation, or a quick introduction of the minimal setup you need to get the server application running.

Needs to create a .env file copying values from .env.example modifying values as desired.

```shell
yarn
yarn dev
```

### Run on docker 

You may modify Dockerfile to set environment variables properly and then execute the following commands:

```shell
docker build . -t mytag
docker run mytag
```

### Endpoints

- `GET` `/rates?fee=0.1&pairs=EURUSD,USDGBP` Get currency rates applying a fee. 
- `GET` `/healthcheck` Returns OK when the application is running. 

### Running tests
To run unit test and see test coverage you can run:

```
yarn test
```

### Requirements.

## Backend Dev - Challenge
# Purpose
The purpose of this document is to state the goals of a tech challenge to be
completed by a candidate that is seeking to join the Settle tech team.
# Goal
The goal of this challenge is to evaluate the candidate’s skills for backend
development in a context of understanding particular business rules of our industry.
# Challenge
# Build an API that allows:
To create rates by obtaining FX rates from a given provider.
To add a mark-up fee over the obtained FX rate
To retrieve a list of these rates detailing:
Pair
Original rate
Fee %
Fee amount
Rate with mark-up fee applied
# Deliverables
Host the solution in an AWS free tier instance.
Document the API endpoints using Swagger
The candidate must provide a Postman Collection to interact with the API.

# Stack
NodeJS, HapiJS, MongoDB

# Pairs
EURUSD
EURARS
USDARS
EURBRL
USDBRL
BRLARS

Hint: As this account is a free account in fixer.io, endpoints and base currencies are
limited. Use your creativity to obtain the rates for the desired pairs!

#### References:

[Source](https://fixer.io)

[Docs](https://fixer.io/documentation)

[Base url](http://data.fixer.io/api/)

[API Access Key]824e753b9d8f1bf170e5adf80e7788e9
