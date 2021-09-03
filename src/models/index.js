const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')

const Loja = require('./loja')
const loja = Loja(sequelize, Sequelize.DataTypes)

const db = {
  loja
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db