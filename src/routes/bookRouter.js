const express = require('express');

const { 
  createBook, 
  readBooks, 
  getBookById, 
  updateBook, 
  deleteBook 
} = require('../controllers/book');

const bookRouter = express.Router();

bookRouter.route('/').post(createBook).get(readBooks);

bookRouter.route('/:id')
  .get(getBookById)
  .patch(updateBook)
  .delete(deleteBook);

module.exports = bookRouter;