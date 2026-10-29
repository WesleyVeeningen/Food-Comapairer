# Food Comparer

Compare foods side by side and see their nutritional values. Pick foods from the database to compare them, look up recipes through the Spoonacular API, and create an account to keep a profile. Built with Node.js, Express, EJS, Tailwind CSS and MySQL.

## Features

- Compare the nutrition of foods from a MySQL `food_nutrition` table
- Recipe search with the [Spoonacular API](https://spoonacular.com/food-api)
- Register and log in, with passwords hashed with bcrypt (email verification pages exist but aren't wired up yet)
- Profile and about pages

## Stack

- Node.js, Express and EJS templates
- Tailwind CSS
- MySQL (`mysql2`), `express-session`, `bcryptjs`
- Spoonacular API through `axios`

## Running it

Requires Node.js and a MySQL database with `food_nutrition` and `users` tables.

1. Install dependencies:

   ```bash
   npm install
   npm install node-fetch@2
   ```

   (`node-fetch` is used in `routes/index.js` but missing from `package.json`.)

2. Create a `.env` file:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=food_comparer
   SESSION_SECRET=any-long-random-string
   ```

3. Start the server and, in a second terminal, the Tailwind build:

   ```bash
   npm start
   npm run tailwind
   ```

   Open http://localhost:3000.

## Routes

| Route | What it does |
| --- | --- |
| `/` | Food list and comparison |
| `/recipes` | Recipe search |
| `/profiel` | Profile page |
| `/about` | About page |
| `/auth/login`, `/auth/register` | Accounts |
| `/api/recipes/:query` | Spoonacular recipe search as JSON |

## Project layout

```
app.js            Express setup
database.js       MySQL connection pool
routes/           pages (index), accounts (auth) and the recipe API (api)
moduls/verify.js  verification email sender (not used yet)
views/            EJS pages and partials
```
