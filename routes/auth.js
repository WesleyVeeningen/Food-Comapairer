const express = require('express');
const pool = require('../database.js'); // Assuming you're exporting the pool from database.js
const bcrypt = require("bcrypt");
const saltRounds = 10
const router = express.Router();
// geen chatgpt gebruiken he 😉
// Define your auth routes here



router.get('/login', async function(reg, res, next) {
        res.render('auth/login', { title: 'login page', error: reg.query.error });
});

router.post('/login', async function(req, res, next) {
    try {
        let username = req.body.username;
        let password = req.body.password.toString();

        // Get a connection from the pool
        pool.getConnection(async (err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                return next(err);
            }

            if (!username || !password) {
                res.redirect('/auth/login?error=fill in all fields');
                return;
            }

            // Execute the query using the connection
            const query = `SELECT * FROM users WHERE user_name = ?`;
            connection.query(query, [username], async (error, results) => {
                connection.release(); // Release the connection back to the pool
                 if (error) {
                    console.error('Error executing query:', error);
                    return next(error);
                }

                if (results.length > 0) {
                    // User exists in the database\

                    let dbpassword = results[0].user_password; // Assuming 'user_password' is a Buffer or non-string type
                    
                    // Compare plaintext password with hashed password
                    bcrypt.compare(password, dbpassword, function(err, compare) {
                        console.log(compare, " " + password + " " + dbpassword);
                        console.log("test 2")
                        if (!compare) {
                            res.redirect('/auth/login?error=Invalid username or password');
                        } else {
                            if (results[0].verify == 1) {
                                res.redirect('/');
                            }
                                else {
                                    req.session.username = username;
                                    res.redirect('/auth/verify?error=verify your email');
                                }
                        }
                    })
                } else {
                    console.log("test")
                    // User does not exist or incorrect credentials
                    res.redirect('/auth/login?error=Invalid username or password');
                }
            });
        });
    } catch (error) {
        // Handle the error
        console.error(error);
        res.send('An error occurred');
    }
});


router.get('/verify', async function(req, res, next) {
res.render('auth/verify', { title: 'verify page', error: req.query.error });
});

router.get('/verify/:id', async function(req, res, next) {
    res.render('auth/verify', { title: 'verify page', error: req.query.error });
})

router.post('/verify', async function(req, res, next) {
    req.body.token = req.body.token;
})

router.get('/register/', async function(req, res, next) {
    res.render('auth/register', { title: 'register page', error: req.query.error });
});

router.post('/register', async function(req, res, next) {
    let { username, email, password } = req.body;

    console.log(username, email, password)

    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return next(err);
        }

        if (!username || !password || !email) {
            res.redirect('/auth/register?error=fill in all fields');
            return;
        }
    
        // Check if the requested username or email already exists
        const checkQuery = `SELECT * FROM users WHERE user_name = ? OR user_email = ?`;
        const checkValues = [username, email];

        connection.query(checkQuery, checkValues, async (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                return next(error);
            }

            
            if (results.length > 0) {
                // Username or email already exists
                res.redirect('/auth/register?error=Username or email already in use');
            } else {
                password = password.toString();
                let hashPass = await bcrypt.hash(password, saltRounds);

                // Prepare the query using placeholders
                const insertQuery = `INSERT INTO users (user_name, user_password, user_email) VALUES (?, ?, ?)`;
                const insertValues = [username, hashPass, email];

                // stuur verify email

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
