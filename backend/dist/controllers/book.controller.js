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
            /*BookModel.aggregate([{$sample: {size: 1}}], (err, book) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(book.title);
                    console.log(book.authors);
                    res.json(book);
                }
            })*/
            /*BookModel.aggregate([{$sample: {size: 1}}]).exec((err, book) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(book);
                }
            })*/
            book_1.default.count().exec((err, count) => {
                var random = Math.floor(Math.random() * count);
                book_1.default.findOne().skip(random).exec((err, book) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        //console.log(book.title);
                        //console.log(book.authors);
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
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map