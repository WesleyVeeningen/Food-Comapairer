const express = require('express');
const pool = require('../database.js'); // Assuming you're exporting the pool from database.js
const router = express.Router();
// geen chatgpt gebruiken he 😉
// Define your auth routes here

router.get('/login', async function(req, res) {
    try {
        res.render('auth/login', { title: 'login page' });
    } catch (error) {
        // Handle the error
        console.error(error);
        res.send('An error occurred');
    }
});

router.post('/login', async function(req, res, next) {
    try {
        const { username, password } = req.body;

        // Get a connection from the pool
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                return next(err);
            }

            // Execute the query using the connection
            const query = `SELECT * FROM users WHERE user_name = ? AND user_password = ?`;
            connection.query(query, [username, password], (error, results, fields) => {
                connection.release(); // Release the connection back to the pool

                if (error) {
                    console.error('Error executing query:', error);
                    return next(error);
                }

                if (results.length > 0) {
                    // User exists in the database
                    res.redirect('/')
                } else {
                    // User does not exist or incorrect credentials
                    res.send('Invalid username or password');
                }
            });
        });
    } catch (error) {
        // Handle the error
        console.error(error);
        res.send('An error occurred');
    }
});


router.get('/register', async function(req, res,next){

    res.render('auth/register')
})

router.post('/register', async function(req, res, next) {
    const { username, email, password } = req.body;

    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return next(err);
        }

        const { username, email } = req.body;

        if (!username || !password || !email) {
            res.redirect('/auth/register?error=true');
            return;
        }
        
        // Check if the requested username or email already exists
        const checkQuery = `SELECT * FROM users WHERE user_name = ? OR user_email = ?`;
        const checkValues = [username, email];

        connection.query(checkQuery, checkValues, (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                return next(error);
            }

            
            if (results.length > 0) {
                // Username or email already exists
                res.send('Username or email already in use');
            } else {
                // Prepare the query using placeholders
                const insertQuery = `INSERT INTO users (user_name, user_password, user_email) VALUES (?, ?, ?)`;
                const insertValues = [username, password, email];

                // Execute the query using the connection and prepared statement
                connection.query(insertQuery, insertValues, (error, results, fields) => {
                    connection.release(); // Release the connection back to the pool

                    if (error) {
                        console.error('Error executing query:', error);
                        return next(error);
                    }

                    // User registered successfully
                    res.redirect('/auth/login');
                });
            }
        });
    });
});
// Define other routes...

module.exports = router;
