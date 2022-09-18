import express from 'express';
import { BookController } from '../controllers/book.controller';

const bookRouter = express.Router();

bookRouter.route('/getTop3Books').get(
    (req, res) => new BookController().getTop3Books(req, res)
)

bookRouter.route('/getBookOfTheDay').get(
    (req, res) => new BookController().getBookOfTheDay(req, res)
)

bookRouter.route('/getBookImage').post(
    (req, res) => new BookController().getBookImage(req, res)
)

bookRouter.route('/searchBooks').post(
    (req, res) => new BookController().searchBooks(req, res)
)

bookRouter.route('/getBook').post(
    (req, res) => new BookController().getBook(req, res)
)

bookRouter.route('/updateBookAndNotImage').post(
    (req, res) => new BookController().updateBookAndNotImage(req, res)
)

bookRouter.route('/getAllBooks').get(
    (req, res) => new BookController().getAllBooks(req, res)
)

bookRouter.route('/deleteBook').post(
    (req, res) => new BookController().deleteBook(req, res)
)

bookRouter.route('/acceptBookRequest').post(
    (req, res) => new BookController().acceptBookRequest(req, res)
)

bookRouter.route('/rejectBookRequest').post(
    (req, res) => new BookController().rejectBookRequest(req, res)
)

bookRouter.route('/getAllBookRequests').get(
    (req, res) => new BookController().gettAllBookRequests(req, res)
)

bookRouter.route('/getRequestImage').post(
    (req, res) => new BookController().getRequestImage(req, res)
)

bookRouter.route('/rentBook').post(
    (req, res) => new BookController().rentBook(req, res)
)

bookRouter.route('/returnBook').post(
    (req, res) => new BookController().returnBook(req, res)
)

export default bookRouter;