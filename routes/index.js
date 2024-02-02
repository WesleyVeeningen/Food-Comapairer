var express = require('express');
var msql2 = require('mysql2');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch');
const pool = require('../database.js'); // Assuming you're exporting the pool from database.js


var router = express.Router();


// let result = await fetch('http://localhost:3000/api/recipes/pasta')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     // Handle the fetched data here
//     return data;
//   })
//   .catch(error => {
//     // Handle any errors that occurred during the fetch
//     console.error(error);
//   });


/* GET home page. */
router.get('/', async function (req, res, next) {
  pool.getConnection((err, connection) => {
    if (err) throw err; // handle error

    let query = 'SELECT * FROM food_nutrition';
    connection.query(query, (err, result) => {
      if (err) throw err; // handle error

      console.log(result.length);

      if (result.length > 0) {
        res.render('index', { title: 'Express', data: result });
      } else {
        res.render('index', { title: 'express' });
      }

      connection.release(); // release connection
    });
  });

  // res.render('index', { title: 'Express' });
});

router.get('/fetch-food-data', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ message: 'Hello, World!' }));
  res.end();
}
);

router.post('/fetch-food-data', async (req, res) => {
  const chosenFood = req.body.chosenFood;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Construct the SQL query to fetch data based on chosenFood
    const sqlQuery = `SELECT * FROM foods WHERE name IN (?)`;
    const [rows] = await connection.query(sqlQuery, [chosenFood]);

    // Release the connection
    connection.release();

    // Send the fetched data back to the frontend
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching food data:', error);
    res.status(500).json({ success: false, error: 'Error fetching food data' });
  }
});


router.post('/', async function (req, res) {

});










/* GET recipes page. */
router.get('/recipes', async function (req, res, next) {
  // let result = await fetch('http://localhost:3000/api/recipes')
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     // Handle the fetched data here
  //     return data;
  //   })
  //   .catch(error => {
  //     // Handle any errors that occurred during the fetch
  //     console.error(error);
  //   });
  res.render('recipes', { title: 'Recipes' });
});

/* GET profiel page. */
router.get('/profiel', function (req, res, next) {
  res.render('profiel', { title: 'Profiel' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' });
});


module.exports = router;
