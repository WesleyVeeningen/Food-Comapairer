var express = require('express');
var router = express.Router();

const axios = require('axios');

const apiKey = 'dc819ff486c14b65b36add80e73c5250';
const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';

async function searchRecipes(query, number) {
  try {
    const params = {
      apiKey: apiKey,
      query: query,
      number: number,
    };

    const response = await axios.get(apiUrl, { params });
    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error; // Optionally rethrow the error for further handling
  }
}

/* GET home page. */
router.get('/recipes', async function(req, res, next) {
res.json(await searchRecipes('chicken', 5));
  
});

router.get('/recipes/:query', async function(req, res, next) {
    res.json(await searchRecipes(req.params.query, 5));
        
    });

module.exports = router;
