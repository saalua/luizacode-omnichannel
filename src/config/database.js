require('dotenv').config();

module.exports = {
    development: {
        database: process.env.DB,
        username: process.env.USER,
        password: process.env.PASS,
        host: process.env.HOST,
        port: process.env.PGPORT,
        dialect: 'postgres',
    },
    test: {
        database: process.env.DB,
        username: process.env.USER,
        password: process.env.PASS,
        host: process.env.HOST,
        port: process.env.PGPORT,
        dialect: 'postgres',
    },
    production: {
        database: process.env.DB,
        username: process.env.USER,
        password: process.env.PASS,
        host: process.env.HOST,
        port: process.env.PGPORT,
        dialect: 'postgres',
    },
};
