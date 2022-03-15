const express = require('express');
const readerRouter = require('./routes/readerRouter');
const bookRouter = require('./routes/bookRouter');
const genreRouter = require('./routes/genreRouter');
const authorRouter = require('./routes/authorRouter');

const app = express();

app.use(express.json());
app.use('/readers', readerRouter);
app.use('/books', bookRouter);
app.use('/genres', genreRouter);
app.use('/authors', authorRouter);

module.exports = app;