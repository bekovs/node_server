const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse JSON bodies for this API
app.use(bodyParser.json());

// Sample data
let movies = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

// GET /movies - Get all movies
app.get('/movies', (req, res) => {
  res.json(movies);
  console.log(movies)
});

// POST /movies - Create a new item
app.post('/movies', (req, res) => {
  const newItem = req.body;
  movies.push(newItem);
  res.status(201).json(newItem);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});