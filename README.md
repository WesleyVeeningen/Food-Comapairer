Food Comparer
=============

This project is a web application that allows users to compare different food items and view their nutritional information. It is built using Node.js, Express, and Tailwind CSS, and uses the Spoonacular API to fetch data about food items.

Getting Started
---------------

To get started with the project, first make sure you have Node.js and npm installed on your machine. Then, follow these steps:

1.  Clone the repository: `git clone https://github.com/your-username/food-comparer.git`
2.  Navigate to the project directory: `cd food-comparer`
3.  Install the dependencies: `npm install`
4.  Start the development server: `npm start`
5.  To start the tailwindcss build process: `npm run tailwind`

The application will be available at `http://localhost:3000`.

Dependencies
------------

The following dependencies are used in this project:

-   axios: A promise-based HTTP client for the browser and Node.js
-   cookie-parser: A middleware for parsing cookie headers
-   debug: A debugging utility for Node.js
-   ejs: A simple templating language for Node.js
-   express: A web application framework for Node.js
-   http-errors: An error handling middleware for Node.js
-   morgan: A logging middleware for Node.js

Dev Dependencies
----------------

The following dev dependencies are used in this project:

-   nodemon: A development server that watches for changes and restarts the app
-   tailwindcss: A utility-first CSS framework for rapidly building custom user interfaces

Scripts
-------

The following scripts are available in the `package.json` file:

-   `start`: Starts the development server
-   `tailwind`: Starts the tailwindcss build process

Config
------

in your `spoonacularApi.js` file, you can import and use the API key:

javascript

DownloadCopy code

```javascript
const axios = require('axios');
const config = require('./config');

const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';

async function searchRecipes(query, number) {
 try {
   const params = {
     apiKey: config.spoonacularApiKey,
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
```

Contributing
------------

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
-------

This project is licensed under the MIT License - see the [LICENSE.md](https://www.blackbox.ai/LICENSE.md) file for details.