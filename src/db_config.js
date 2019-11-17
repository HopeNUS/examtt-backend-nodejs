const Sequelize = require('sequelize');
const settings = require('./settings')

const db_config = {
    "DEV": {
        "database": "postgres",
        "username": "jeremiah-ang",
        "password": "jeremiah-ang",
        "host": "127.0.0.1",
        "dialect": "postgres",
    },
    "LIVE": {
        "database": "postgres",
        "username": "jeremiah-ang",
        "password": "jeremiah-ang",
        "host": "127.0.0.1",
        "dialect": "postgres",
    },
}

const config = db_config[settings.ENV]
exports.sequelize = new Sequelize(config['database'], config['username'], config['password'], {
    host: config['host'],
    dialect: config['dialect'],
    pool: {
        max: 15,
    }
});