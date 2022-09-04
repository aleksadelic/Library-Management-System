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
exports.default = bookRouter;
//# sourceMappingURL=book.routes.js.map