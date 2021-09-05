require('dotenv').config();

const Sequelize = require('sequelize');
const configDatabase = require('./database');

// const sequelize = new Sequelize(configDatabase)
const sequelize = new Sequelize(
  process.env.DB || configDatabase.database,
  process.env.USER || configDatabase.username,
  process.env.PASS || configDatabase.password,
  {
    host: process.env.HOST || configDatabase.host,
    dialect: 'postgres' || configDatabase.dialect,
  }
);

module.exports = sequelize;
