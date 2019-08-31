
const mysql = require('mysql');
const logger = require('../logger');
const config = require('../config.json');

const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.db
})

connection.connect((err) => {
    if (err) {
        logger.log('error', `Error connecting to MySQL: ${err.code} #${err.errno} - ${err.sqlMessage}`);
        process.exit(1)
    }
    logger.log('info', `Successfully connected to MySQL.`);
})


module.exports = connection;