const express = require('express');
const { 
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor, 
  deleteAuthor,
} = require('../controllers/author');

const authorRouter = express.Router();

authorRouter.route('/').post(createAuthor).get(getAllAuthors);

authorRouter.route('/:id')
  .get(getAuthorById)
  .patch(updateAuthor)
  .delete(deleteAuthor);

module.exports = authorRouter;