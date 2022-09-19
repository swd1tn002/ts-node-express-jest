
module.exports = {
  "development": {
    "storage": "db/development.sqlite",
    "dialect": "sqlite",
    "seederStorage": "sequelize"
  },
  "test": {
    "storage": "db/test.sqlite",
    "dialect": "sqlite",
    "seederStorage": "sequelize"
  },
  "production": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_NAME,
    "host": process.env.PROD_DB_HOSTNAME,
    "port": process.env.PROD_DB_PORT,
    "dialect": "mysql",
    "seederStorage": "sequelize"
  }
}