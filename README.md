## Dockerized [Nest && Prisma && MySQL]() base API

## Ports and Database
```bash
API port: 3003

MySQL port: 3306
MySQL database name: datatase

```
## Compose

```bash
docker compose up --build

## Database init

docker exec -it api npx prisma migrate dev

## api container restart after database initialization

docker restart api

```
## PS

- Author - [Petros Zavrakas](##########@gmail.com)