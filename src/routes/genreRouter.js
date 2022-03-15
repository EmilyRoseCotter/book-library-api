const express = require('express');
const {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require('../controllers/genre');

const genreRouter = express.Router();

genreRouter.route('/').post(createGenre).get(getAllGenres);

genreRouter.route('/:id')
  .get(getGenreById)
  .patch(updateGenre)
  .delete(deleteGenre);

module.exports = genreRouter;