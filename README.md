# Burda media recruitment task

## Starting

### Prerequisites

1. Docker with docker compose

### Docker

Set env in docker-compose.yml file:

```
      - APP_PORT=3000
      - ENVIRONMENT=LOCAL
```

If you changed APP_PORT, remember to change it in ports mapping in docker compose

```
    ports:
      - 3000:3000 # here
      - 9229:9229
```


Start application using docker compose

```sh
docker compose up
```

### Local non-docker env

```sh
cp .env.tpl .env

npm i

npm run build

npm run start
```

## About implementation

1. I used The Knapsack Problem Algorithm to solve this issue.
2. There are used CQRS (Command Query Responsibility Segregation) as an architectural pattern and Dependency Injection as a design pattern.
3. DI is solved by the awilix js library
4. I created some simple unit tests for TDD approach
5. Api docs is setup by openApi (/api-docs)


