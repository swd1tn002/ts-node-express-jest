# Project database

This project utilizes [Sequelize ORM](https://sequelize.org/) and its [command line interface](https://sequelize.org/docs/v6/other-topics/migrations/#installing-the-cli) for managing transactions and seed data.

## PostalCode table creation

The PostalCode schema was created with the following command:

```sh
$ npx sequelize-cli model:generate --name PostalCode --attributes code:string,district:string
```

The migration can then be run with db:migrate command:

```sh
$ npx sequelize-cli db:migrate
```

Or more simply using the custom script in package.json:

```sh
$ npm run migrate
```

## Seed data

Seed data can be fetched and inserted into the created DB with the `npm seed` command:

```sh
$ npm run seed
```
