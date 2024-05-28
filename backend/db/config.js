const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'election_commission_of_pakistan'
})

module.exports = connection;