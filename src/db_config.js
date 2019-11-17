const Sequelize = require('sequelize');
const settings = require('./settings')

const db_config = {
    "DEV": {
        "database": "postgres",
        "username": "jeremiah-ang",
        "password": "jeremiah-ang",
        "host": "127.0.0.1",
        "port": "5432",
        "dialect": "postgres",
    },
    "LIVE": {
        "database": process.env.DB_DATABASE,
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "postgres",
    },
}

const config = db_config[settings.ENV]
exports.sequelize = new Sequelize(config['database'], config['username'], config['password'], {
    host: config['host'],
    dialect: config['dialect'],
    port: config['port'],
    pool: {
        max: 15,
    }
});