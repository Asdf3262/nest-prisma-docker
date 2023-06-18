# Dockerized [Nest && Prisma && MySQL]() base API

# Ports and Database
```bash
API port: 3003

MySQL port: 3306
MySQL database name: datatase

```
# Compose

```bash
docker compose up --build

## Database init

docker exec -it api npx prisma migrate dev

## api container restart after database initialization

docker restart api

```
# API Endpoints

## Users

`Add a User` [/users/add](#post-users/add)
`Verify login user` [/users/login](#post-users/add)
`Get users` [/users]()

### POST users/add

**Parameters**

|Name          | Required | Type
|`email`       | required | string
|`username`    | optional | string
|`password`    | required | string

### POST users/login

**Parameters**

|Name          | Required | Type
|`email`       | required | string
|`username`    | optional | string
|`password`    | required | string

# PS

- Author - [Petros Zavrakas](##########@gmail.com)