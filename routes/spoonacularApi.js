// spoonacularApi.js

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

    // Handle the API response
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error; // Optionally rethrow the error for further handling
  }
}

module.exports = {
  searchRecipes: searchRecipes,
};
