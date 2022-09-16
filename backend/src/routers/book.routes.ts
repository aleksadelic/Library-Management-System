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

export default bookRouter;