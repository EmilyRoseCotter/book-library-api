const {
  createItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
} = require('./helpers');

const createAuthor = (req, res) => createItem(res, 'author', req.body);
const getAllAuthors = (_, res) => getAllItems(res, 'author');
const getAuthorById = (req, res) => getItemById(res, 'author', req.params.id);
const updateAuthor = (req, res) => updateItemById(res, 'author', req.body, req.params.id);
const deleteAuthor = (req, res) => deleteItemById(res, 'author', req.params.id);

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor, 
  deleteAuthor,
};