var express = require('express');
var msql2 = require('mysql2/promise');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch');
const pool = require('../database.js'); // Assuming you're exporting the pool from database.js
const { classroom } = require('googleapis/build/src/apis/classroom/index.js');


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



router.post('/', async function (req, res) {
  console.log('Received request body:', req.body); // Log the received request body

  const chosenFoods = req.body.chosenFoods;

  console.log('Chosen foods:', chosenFoods); // Log the chosen foods

  const jsonData = JSON.stringify(req.body);

  console.log('JSON data:', jsonData); // Log the JSON data

  // Write JSON data to a file named 'data.json'
  fs.writeFile('data.json', jsonData, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ error: 'test 1' });
    }
    console.log('File written successfully');

    // Once the file is written, execute the database query
    executeQuery(chosenFoods, res);
  });
});

function executeQuery(chosenFoods, res) {
  const query = chosenFoods ?
    `SELECT * FROM food_nutrition WHERE name IN (${chosenFoods.map(food => `'${food}'`).join(',')})` :
    'SELECT * FROM food_nutrition';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: 'test 2' });
    }

    connection.query(query, (err, result) => {
      // Release the connection first
      connection.release();

      if (err) {
        console.error('Error executing database query:', err);
        return res.status(500).json({ error: 'test 3' });
      }

      if (result.length === 0) {
        console.error('No foods found');
        return res.status(404).json({ error: 'No foods found' });
      }

      console.log('Query result:', result); // Log the query result

      // Write the query result to a file
      fs.writeFile('../moduls/data.json', JSON.stringify(result), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          return res.status(500).json({ error: 'test 4' });
        }
        console.log('Query result written to file successfully');

        // Render the index view with the data
        res.render('index', { title: 'Express', data: result });
      });
    });
  });
}






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
