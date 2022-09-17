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
            }).sort({ "totalRentals": -1 }).limit(3);
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
                    var filepath;
                    if (book.image == "") {
                        filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\book_images\\default.jpg';
                    }
                    else {
                        filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\book_images\\' + book.image;
                    }
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
        this.updateBookAndImage = (req, res, filename) => {
            let oldTitle = req.body.data[0];
            let title = req.body.data[1];
            let authors = req.body.data[2];
            let genre = req.body.data[3];
            let publisher = req.body.data[4];
            let publishYear = req.body.data[5];
            let language = req.body.data[6];
            let available = req.body.data[7];
            let image = filename;
            book_1.default.updateOne({ 'title': oldTitle }, { $set: { 'title': title, 'authors': authors, 'genre': genre,
                    'publisher': publisher, 'publishYear': publishYear, 'language': language, 'available': available,
                    'image': image } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.updateBookAndNotImage = (req, res) => {
            let oldTitle = req.body.oldTitle;
            let title = req.body.title;
            let authors = req.body.authors;
            let genre = req.body.genre;
            let publisher = req.body.publisher;
            let publishYear = req.body.publishYear;
            let language = req.body.language;
            let available = req.body.available;
            book_1.default.updateOne({ 'title': oldTitle }, { $set: { 'title': title, 'authors': authors, 'genre': genre,
                    'publisher': publisher, 'publishYear': publishYear, 'language': language, 'available': available } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.getAllBooks = (req, res) => {
            book_1.default.find({}, (err, books) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(books);
                }
            });
        };
        this.deleteBook = (req, res) => {
            let title = req.body.title;
            book_1.default.findOne({ 'title': title }, (err, book) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (book.rentals == 0) {
                        book_1.default.deleteOne({ 'title': title }, (err, resp) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json({ 'message': 'ok' });
                            }
                        });
                    }
                    else {
                        res.json({ 'message': 'Postoje zaduzenja knjige!' });
                    }
                }
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map