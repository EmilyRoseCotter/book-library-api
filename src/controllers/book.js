const { 
  createItem, 
  getAllItems, 
  getItemById, 
  updateItemById,
  deleteItemById,
} = require('./helpers');

const createBook = (req, res) => createItem(res, 'book', req.body);
const readBooks = (_, res) => getAllItems(res, 'book');
const getBookById = (req, res) => getItemById(res, 'book', req.params.id);
const updateBook = (req, res) => updateItemById(res, 'book', req.body, req.params.id);
const deleteBook = (req, res) => deleteItemById(res, 'book', req.params.id);

module.exports = { 
  createBook, 
  readBooks, 
  getBookById, 
  updateBook, 
  deleteBook 
};