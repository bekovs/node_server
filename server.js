const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse JSON bodies for this API
app.use(bodyParser.json());

// Sample data
let movies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
];

// GET /movies - Get all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// POST /movies - Create a new movie
app.post('/movies', (req, res) => {
  const newMovie = req.body;
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// GET /movies/:id - Get a single movie by ID
app.get('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    res.status(404).json({ error: 'Movie not found' });
  } else {
    res.json(movie);
  }
});

// PATCH /movies/:id - Update a movie by ID
app.patch('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMovie = req.body;
  const index = movies.findIndex((movie) => movie.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Movie not found' });
  } else {
    movies[index] = { ...movies[index], ...updatedMovie };
    res.json(movies[index]);
  }
});

// DELETE /movies/:id - Delete a movie by ID
app.delete('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Movie not found' });
  } else {
    const deletedMovie = movies.splice(index, 1);
    res.json(deletedMovie[0]);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});