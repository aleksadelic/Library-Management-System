"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.route('/getTop3Books').get((req, res) => new book_controller_1.BookController().getTop3Books(req, res));
bookRouter.route('/getBookOfTheDay').get((req, res) => new book_controller_1.BookController().getBookOfTheDay(req, res));
bookRouter.route('/getBookImage').post((req, res) => new book_controller_1.BookController().getBookImage(req, res));
bookRouter.route('/searchBooks').post((req, res) => new book_controller_1.BookController().searchBooks(req, res));
bookRouter.route('/getBook').post((req, res) => new book_controller_1.BookController().getBook(req, res));
bookRouter.route('/updateBookAndNotImage').post((req, res) => new book_controller_1.BookController().updateBookAndNotImage(req, res));
bookRouter.route('/getAllBooks').get((req, res) => new book_controller_1.BookController().getAllBooks(req, res));
bookRouter.route('/deleteBook').post((req, res) => new book_controller_1.BookController().deleteBook(req, res));
bookRouter.route('/acceptBookRequest').post((req, res) => new book_controller_1.BookController().acceptBookRequest(req, res));
bookRouter.route('/rejectBookRequest').post((req, res) => new book_controller_1.BookController().rejectBookRequest(req, res));
bookRouter.route('/getAllBookRequests').get((req, res) => new book_controller_1.BookController().getAllBookRequests(req, res));
bookRouter.route('/getRequestImage').post((req, res) => new book_controller_1.BookController().getRequestImage(req, res));
bookRouter.route('/rentBook').post((req, res) => new book_controller_1.BookController().rentBook(req, res));
bookRouter.route('/returnBook').post((req, res) => new book_controller_1.BookController().returnBook(req, res));
exports.default = bookRouter;
//# sourceMappingURL=book.routes.js.map