"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_1 = __importDefault(require("../models/book"));
const fs = require('fs');
class BookController {
    constructor() {
        this.getTop3Books = (req, res) => {
            book_1.default.find({}, (err, books) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(books);
                }
            }).sort({ "rentals": -1 }).limit(3);
        };
        this.getBookOfTheDay = (req, res) => {
            book_1.default.count().exec((err, count) => {
                var random = Math.floor(Math.random() * count);
                book_1.default.findOne().skip(random).exec((err, book) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(book);
                    }
                });
            });
        };
        this.getBookImage = (req, res) => {
            let title = req.body.title;
            book_1.default.findOne({ 'title': title }, (err, book) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\book_images\\' + book.image;
                    res.sendFile(filepath);
                }
            });
        };
        this.searchBooks = (req, res) => {
            let searchParam = req.body.searchParam;
            console.log(searchParam);
            var regex = new RegExp([searchParam].join(""), "i");
            book_1.default.find({ $or: [{ title: regex }, { authors: regex }] }, (err, books) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(books);
                }
            });
        };
        this.getBook = (req, res) => {
            let title = req.body.title;
            book_1.default.findOne({ 'title': title }, (err, book) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(book);
                }
            });
        };
        this.addBook = (req, res, filename) => {
            let book = new book_1.default({
                title: req.body.data[0],
                authors: req.body.data[1],
                genre: req.body.data[2],
                publisher: req.body.data[3],
                publishYear: req.body.data[4],
                language: req.body.data[5],
                available: req.body.data[6],
                image: filename,
                rentals: 0
            });
            book.save((err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map