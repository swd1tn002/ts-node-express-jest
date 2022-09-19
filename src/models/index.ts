'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../db/config/database.js')[env];

const Sequelize = require('sequelize');
let sequelize = new Sequelize(config.database, config.username, config.password, config);

export { sequelize, Sequelize }
