const express = require('express');

const booksController = require('../controllers/booksController');


const routes = (Book) => {
    const bookRouter = express.Router();

    // Get book controller
    const controller = booksController(Book);

    // Find all Books
    bookRouter
        .route("/books")
        .post(controller.post)
        .get(controller.get);


    // Create a Middleware
    bookRouter.use("/books/:bookId", (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                return res.send(err);
            }
            if (book)
                req.book = book;

            return next();
        });
    });

    // Find a single book
    bookRouter
        .route("/books/:bookId")
        .get((req, res) => {
            return res.json(req.book);
        })
        .put((req, res) => {
            const {
                book
            } = req;

            book.title = req.body.title;
            book.genre = req.body.genre;
            book.author = req.body.author;
            book.read = req.body.read;
            book.save((err) => {
                if (err)
                    return res.send(err);
                return res.json(book)
            });
        })
        .patch((req, res) => {
            const {
                book
            } = req;

            if (req.body._id)
                delete req.body._id;

            Object.entries(req.body).forEach(item => {
                const key = item[0];
                const value = item[1];
                book[key] = value;
            });

            book.save((err) => {
                if (err)
                    return res.send(err);
                return res.json(book)
            });
        })
        .delete((req, res) => {
            req.book.remove((err) => {
                if (err)
                    return res.send(err);
                return res.sendStatus(204);
            })
        });

    return bookRouter;
}

module.exports = routes;