const {
  createItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
} = require('./helpers');

const createGenre = (req, res) => createItem(res, 'genre', req.body);
const getAllGenres = (_, res) => getAllItems(res, 'genre');
const getGenreById = (req, res) => getItemById(res, 'genre', req.params.id);
const updateGenre = (req, res) => updateItemById(res, 'genre', req.body, req.params.id);
const deleteGenre = (req, res) => deleteItemById(res, 'genre', req.params.id);

module.exports = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
};