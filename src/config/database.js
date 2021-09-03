require('dotenv').config()

module.exports = {
    database: process.env.DB,
    username: process.env.USER,
    password: process.env.PASS,
    host: process.env.HOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
}