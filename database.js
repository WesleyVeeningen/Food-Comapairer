require('dotenv').config(); // Load environment variables from .env file
const mysql = require('mysql2');

// Create MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust the number of connections as needed
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = pool;

