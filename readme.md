# Demo project

[![Docker Image CI](https://github.com/swd1tn002/ts-node-express-jest/actions/workflows/docker-image.yml/badge.svg)](https://github.com/swd1tn002/ts-node-express-jest/actions/workflows/docker-image.yml) [![Node.js CI](https://github.com/swd1tn002/ts-node-express-jest/actions/workflows/node.js.yml/badge.svg)](https://github.com/swd1tn002/ts-node-express-jest/actions/workflows/node.js.yml)


## TypeScript, Node, Express, Sequelize and Jest

This project is an example of a backend project set up using **TS**, **Node** and **Express**. It utilizes **Sequelize** for DB access and migrations and **Jest** for testing. Continuous integration is implemented with **GitHub actions**, which runs tests and builds a **Docker container image** of the project.

Tech        | Role                | Location
------------|---------------------|---
TypeScript  | General language    | [src/](./src)
Express     | HTTP library        | [app.ts](./src/app.ts)
Sequelize   | ORB library and migrations | [Models](./src/models/), [Migrations](./db/migrations/), [Seeders](./db/seeders/)
Jest        | Automated tests     | [src/test](./src/test/)
GitHub actions | Continuous integration | [Tests](./.github/workflows/node.js.yml), [Docker build](./.github/workflows/docker-image.yml)
Docker      | Container image file | [Dockerfile](./Dockerfile)


## Examples

### Installing dependencies

Install command needs to be executed before running the app for the first time, and re-executed each time dependencies are changed in [package.json](./package.json).

```sh
$ npm install
```

### Running locally

Before starting the development server for the first time, a database needs to be initialized by running [database migrations](./db/migrations/).

```sh
$ npm run migrate # initialize db tables
```

To fill the database with initial data of postal codes, you can use seeders defined in [db/seeders/](./db/seeders/). The first seeder fetches Finnish postal codes from [GitHub](https://github.com/theikkila/postinumerot) and inserts them into the database.

```sh
$ npm run seed    # fill database with data
```

When the database is ready, start the server in development mode:

```sh
$ npm run dev     # start development server
```

When the server is running, check the following URLs:

* http://localhost:3000/postalcodes?number=99999
* http://localhost:3000/postalcodes/porvoo/

For more information about what each `npm run` command does behind the scenes, check the `scripts` section in [package.json](./package.json).

The development DB uses **SQLite** and is configured in [db/config/database.js](./db/config/database.js).


### Testing locally

Before running Jest tests for the first time, a separate test database needs to be initialized. The test DB uses **SQLite** and is configured in [db/config/database.js](./db/config/database.js).

```sh
$ NODE_ENV=test npm run migrate # initialize db tables for test DB
$ npm test
```

### Running in container

The container image can be built with the following command:

```sh
$ docker build . --file Dockerfile --tag ts-node-express-jest:latest
```

The image can be run with the following command:

```sh
$ docker run -it --rm -p 3000:3000 ts-node-express-jest:latest
```

`-it` starts the container in the foreground. `--rm` removes the container when it is shut down. `-p 3000:3000` forwards local port 3000 inside the container.

## Example calls to the app

### Get the postal district name for a given postal code

```sh
$ curl http://localhost:3000/postalcodes?number=99999
```

```json
{
  "number": "99999",
  "name": "KORVATUNTURI"
}
```

### Get the postal codes for a given postal district name

```sh
curl http://localhost:3000/postalcodes/porvoo/
```

```json
{
  "name": "porvoo",
  "numbers": ["06100", "06401", "06151", "06150", "06101", "06500", "06450", "06400", "06200"]
}
```

---

# Licenses

## Postalcode data

This project utilizes postal codes collected by [@theikkila](https://github.com/theikkila) and [@otlaitil](https://github.com/otlaitil) at [https://github.com/theikkila/postinumerot](https://github.com/theikkila/postinumerot).

> *"Data on postin ja sitä koskee kaikki http://www.posti.fi/liitteet-yrityksille/ehdot/postinumeropalvelut-palvelukuvaus-ja-kayttoehdot.pdf dokumentin käyttöehdot."*
>
> *"JSON-muunnokset ovat vapaasti käytettävissä ja muunneltavissa."*
>
> Source: https://github.com/theikkila/postinumerot