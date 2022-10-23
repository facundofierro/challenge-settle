## Settle challenge.

This is a sample application taking in account the requirements described at the end of the document.

Some not done features:
- The code coverage is not completed and not all use cases are covered
- Errors management should be improved

### Installation
Step by step instullation explanation, or a quick introduction of the minimal setup you need to get the server application running.

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

- `POST` `/rates` Get currency rates applying a fee. 
Body example:
```shell
{
    "pairs": ["BRLARS","EURUSD","ARSEUR", "EURARS", "EURBRL"],
    "fee": 0.05  
}
```


Sample calls:
```shell
http://localhost:9650/transaction
http://localhost:9650/contract/bin
http://localhost:9650/contract/abi?hash=0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd
http://localhost:9650/contract/abi?hash=0x60aE616a2155Ee3d9A68541Ba4544862310933d4
http://localhost:9650/contract/abi?hash=0x454E67025631C065d3cFAD6d71E6892f74487a15

```

### Running tests
To run unit test and see test coverage you can run:

```
yarn test
```

#### Requirements.

Backend Dev - Challenge
Purpose
The purpose of this document is to state the goals of a tech challenge to be
completed by a candidate that is seeking to join the Settle tech team.
Goal
The goal of this challenge is to evaluate the candidate’s skills for backend
development in a context of understanding particular business rules of our industry.
Challenge
Build an API that allows:
To create rates by obtaining FX rates from a given provider.
To add a mark-up fee over the obtained FX rate
To retrieve a list of these rates detailing:
Pair
Original rate
Fee %
Fee amount
Rate with mark-up fee applied
Deliverables
Host the solution in an AWS free tier instance.
Document the API endpoints using Swagger
The candidate must provide a Postman Collection to interact with the API.

Stack
NodeJS, HapiJS, MongoDB

Pairs
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
