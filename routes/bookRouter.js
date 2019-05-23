const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();

  bookRouter.route('/books')
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) return res.send(err);
      return res.json(books);
    });
  })
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
  });

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) return res.send(err);
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter.route('/books/:bookId')
  .get((req, res) => res.json(req.book))
  .put((req, res) => {
    const { book } = req;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    req.book.save((err) => {
      if (err) return res.send(err);
      return res.json(book);
    });
  })
  .patch((req, res) => {
    const { book } = req;
    if (req.body._id) delete req.body._id;
    Object.entries(req.body).forEach(item => book[item[0]] = item[1]);
    req.book.save((err) => {
      if (err) return res.send(err);
      return res.json(book);
    });
  });

  return bookRouter;
}

module.exports = routes;