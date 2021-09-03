require('dotenv').config()
console.log(process.env.DB)

module.exports = {
    database: process.env.DB,
    username: process.env.USER,
    password: process.env.PASS,
    host: process.env.HOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
}