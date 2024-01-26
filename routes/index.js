var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let result = await fetch('http://localhost:3000/api/recipes/pasta')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle the fetched data here
      return data;
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error(error);
    });
  res.render('index', { title: 'Express', recipes: result.results});
});

module.exports = router;