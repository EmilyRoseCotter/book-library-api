const { expect } = require('chai');
const request = require('supertest');
const { Book, Genre, Author } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  let testGenre;
  let testAuthor;

  before(async () => Book.sequelize.sync());

  describe('with no records in the database', () => {
    beforeEach(async () => {
      await Book.destroy({ where: {} });
      await Genre.destroy({ where: {} });
      await Author.destroy({ where: {} });
      testGenre = await Genre.create({ genre: 'Romance' });
      testAuthor = await Author.create({ author: 'Jane Austin' });
    });

    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'Pride and prejudice',
          author: testAuthor.id,
          genre: testGenre.id,
          ISBN: '9780140430721',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('Pride and prejudice');
        expect(response.body.ISBN).to.equal('9780140430721');

        expect(newBookRecord.title).to.equal('Pride and prejudice');
        expect(newBookRecord.ISBN).to.equal('9780140430721');
      });

      it('cannot create a book if there is no author or title', async () => {
        const response = await request(app).post('/books').send({});
        const newBookRecord = await Book.findByPk(response.body.id);
    
        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('errors');
        expect(newBookRecord).to.equal(null);
      });

      it('errors if title is empty string', async () => {
        const response = await request(app).post('/readers').send({
          title: '',
          author: testAuthor.id,
          genre: testGenre.id,
          ISBN: '9780140430721',
        });
        const newBookRecord = await Book.findByPk(response.body.id);
  
        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('errors');
        expect(newBookRecord).to.equal(null);
      });

      it('errors if author is empty string', async () => {
        const response = await request(app).post('/readers').send({
          title: 'Pride and prejudice',
          author: '',
          genre: testGenre.id,
          ISBN: '9780140430721',
        });
        const newBookRecord = await Book.findByPk(response.body.id);
  
        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('errors');
        expect(newBookRecord).to.equal(null);
      });
    });
  });
    
  describe('with books in the database', () => {
    let books;

    beforeEach(async () => {
      await Book.destroy({ where: {} });

      const testAuthorOne = Author.create({
        author: 'Jane Austin'
      });

      const testAuthorTwo = Author.create({
        author: 'Homer'
      });

      const testAuthorThree = Author.create({
        author: 'George Orwell'
      }); 

      const testGenreOne = Genre.create({
        genre: 'Romance'
      });

      const testGenreTwo = Genre.create({
        genre: 'Epic poetry'
      });

      const testGenreThree = Genre.create({
        genre: 'Dystopian'
      });

      books = await Promise.all([
        Book.create({
          title: 'Pride and prejudice',
          author: testAuthorOne.id,
          genre: testGenreOne.id,
          ISBN: '9780140430721',
        }),
        Book.create({ 
          title: 'The Illiad', 
          author: testAuthorTwo.id,
          genre: testGenreTwo.id,
          ISBN: '9780800042011'
        }),
        Book.create({
          title: 'Nineteen Eighty-Four',
          author: testAuthorThree.id,
          genre: testGenreThree.id,
          ISBN: '9780140817744'
        }),
      ]);
    });   

    describe('GET /books', () => {
      it('gets all books records', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe('GET /books/:id', () => {
      it('gets book records by id', async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });

    describe('PATCH /books/:id', () => {
      it('updates book by id', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ title: 'Pride and Prejudice'});

        const updateBookRecord = await Book.findByPk(book.id, {
          raw: true
        });

        expect(response.status).to.equal(200);
        expect(updateBookRecord.title).to.equal('Pride and Prejudice');
      });

      it('returns a 404 if book does not exist', async () => {
        const response = await request(app)
          .patch('/books/12345')
          .send({ title: 'some book'});

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.')
      });
    });

    describe('DELETE /books/:id', () => {
      it('deletes book by id', async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, {
          raw: true
        });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it('reutrns a 404 if the book does not exist', async () => {
        const response = await request(app).delete('/books/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
  });
});