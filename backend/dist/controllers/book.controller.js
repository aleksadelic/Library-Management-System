"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const bookRequest_1 = __importDefault(require("../models/bookRequest"));
const book_1 = __importDefault(require("../models/book"));
const bookCounter_1 = __importDefault(require("../models/bookCounter"));
const user_1 = __importDefault(require("../models/user"));
const rentingHistory_1 = __importDefault(require("../models/rentingHistory"));
const notification_1 = __importDefault(require("../models/notification"));
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
            let id = req.body.id;
            book_1.default.findOne({ 'id': id }, (err, book) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var filepath;
                    if (book.image == null || book.image == "") {
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
            let id = req.body.id;
            book_1.default.findOne({ 'id': id }, (err, book) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(book);
                }
            });
        };
        this.addBook = (req, res, filename) => {
            let authors = req.body.data[1].split(',');
            let genre = req.body.data[2].split(',', 3);
            bookCounter_1.default.findOneAndUpdate({ 'name': 'nextBookId' }, { $inc: { 'nextId': 1 } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var nextId = resp.nextId;
                    let book = new book_1.default({
                        id: nextId,
                        title: req.body.data[0],
                        authors: authors,
                        genre: genre,
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
                }
            });
        };
        this.updateBookAndImage = (req, res, filename) => {
            let id = req.body.data[0];
            let title = req.body.data[1];
            let authors = req.body.data[2];
            let genre = req.body.data[3];
            let publisher = req.body.data[4];
            let publishYear = req.body.data[5];
            let language = req.body.data[6];
            let available = req.body.data[7];
            let image = filename;
            book_1.default.updateOne({ 'id': id }, { $set: { 'title': title, 'authors': authors, 'genre': genre,
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
            let id = req.body.id;
            let title = req.body.title;
            let authors = req.body.authors;
            let genre = req.body.genre;
            let publisher = req.body.publisher;
            let publishYear = req.body.publishYear;
            let language = req.body.language;
            let available = req.body.available;
            book_1.default.updateOne({ 'id': id }, { $set: { 'title': title, 'authors': authors, 'genre': genre,
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
            let id = req.body.id;
            book_1.default.findOne({ 'id': id }, (err, book) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (book.rentals == 0) {
                        book_1.default.deleteOne({ 'id': id }, (err, resp) => {
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
        this.addBookRequest = (req, res, filename) => {
            let authors = req.body.data[2].split(',');
            let genre = req.body.data[3].split(',', 3);
            bookCounter_1.default.findOneAndUpdate({ 'name': 'nextReqId' }, { $inc: { 'nextId': 1 } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var nextId = resp.nextId;
                    let bookRequest = new bookRequest_1.default({
                        id: nextId,
                        username: req.body.data[0],
                        title: req.body.data[1],
                        authors: authors,
                        genre: genre,
                        publisher: req.body.data[4],
                        publishYear: req.body.data[5],
                        language: req.body.data[6],
                        image: filename,
                    });
                    bookRequest.save((err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.acceptBookRequest = (req, res) => {
            let id = req.body.id;
            bookRequest_1.default.findOne({ 'id': id }, (err, request) => {
                if (err) {
                    console.log(err);
                }
                else {
                    bookCounter_1.default.findOneAndUpdate({ 'name': 'nextBookId' }, { $inc: { 'nextId': 1 } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            var nextId = resp.nextId;
                            let book = new book_1.default({
                                id: nextId,
                                title: request.title,
                                authors: request.authors,
                                genre: request.genre,
                                publisher: request.publisher,
                                publishYear: request.publishYear,
                                language: request.language,
                                image: request.image
                            });
                            book.save((err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    bookRequest_1.default.deleteOne({ 'id': id }, (err, resp) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            notification_1.default.findOne({ 'username': request.username }, (err, notif) => {
                                                if (err)
                                                    console.log(err);
                                                else {
                                                    let newNotif = 'Knjiga koju je korisnik predlozio je dodata - ' + request.title;
                                                    if (notif) {
                                                        notification_1.default.updateOne({ 'username': request.username }, { $push: { 'notifications': newNotif } }, (err, resp) => {
                                                            if (err)
                                                                console.log(err);
                                                            else
                                                                res.json({ 'message': 'ok' });
                                                        });
                                                    }
                                                    else {
                                                        let newNotifModel = new notification_1.default({
                                                            username: request.username,
                                                            notifications: [newNotif]
                                                        });
                                                        newNotifModel.save((err, resp) => {
                                                            if (err)
                                                                console.log(err);
                                                            else
                                                                res.json({ 'message': 'ok' });
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.rejectBookRequest = (req, res) => {
            let id = req.body.id;
            bookRequest_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.getAllBookRequests = (req, res) => {
            bookRequest_1.default.find({}, (err, requests) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(requests);
                }
            });
        };
        this.getRequestImage = (req, res) => {
            let id = req.body.id;
            bookRequest_1.default.findOne({ 'id': id }, (err, request) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (request.image == null || request.image == "")
                        request.image = 'default.jpg';
                    var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\book_images\\' + request.image;
                    res.sendFile(filepath);
                }
            });
        };
        this.rentBook = (req, res) => {
            let book = req.body.book;
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user == null) {
                        res.json({ 'message': 'error' });
                        return;
                    }
                    let rental = {
                        book: book,
                        daysLeft: 30,
                        rentalDate: new Date()
                    };
                    user_1.default.updateOne({ 'username': username }, { $push: { 'rentals': rental } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    book_1.default.updateOne({ 'id': book.id }, { $inc: { 'available': -1, 'rentals': 1, 'totalRentals': 1 } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.returnBook = (req, res) => {
            let username = req.body.username;
            let id = req.body.id;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var rental;
                    for (let i = 0; i < user.rentals.length; i++) {
                        if (user.rentals[i].book.id == id) {
                            rental = user.rentals[i];
                            break;
                        }
                    }
                    var rentals = user.rentals.filter((value, index, arr) => {
                        return value.book.id != id;
                    });
                    user_1.default.updateOne({ 'username': username }, { $set: { 'rentals': rentals } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            book_1.default.updateOne({ 'id': id }, { $inc: { 'available': 1, 'rentals': -1 } }, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    let rentalRecord = {
                                        title: rental.book.title,
                                        id: rental.book.id,
                                        authors: rental.book.authors,
                                        rentalDate: rental.rentalDate,
                                        returnDate: new Date()
                                    };
                                    rentingHistory_1.default.findOne({ 'username': username }, (err, record) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (record == null) {
                                                let newRecord = new rentingHistory_1.default({
                                                    username: username,
                                                    rentalRecords: []
                                                });
                                                newRecord.save((err, resp) => {
                                                    if (err)
                                                        console.log(err);
                                                    else {
                                                        rentingHistory_1.default.updateOne({ 'username': username }, { $push: { 'rentalRecords': rentalRecord } }, (err, resp) => {
                                                            if (err) {
                                                                console.log(err);
                                                            }
                                                            else {
                                                                res.json({ 'message': 'ok' });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                            else {
                                                rentingHistory_1.default.updateOne({ 'username': username }, { $push: { 'rentalRecords': rentalRecord } }, (err, resp) => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    else {
                                                        res.json({ 'message': 'ok' });
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map