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

export default bookRouter;