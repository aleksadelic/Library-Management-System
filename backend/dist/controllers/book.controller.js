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
const deadline_1 = __importDefault(require("../models/deadline"));
const reservation_1 = __importDefault(require("../models/reservation"));
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
            reservation_1.default.find({ 'bookId': id, 'condition': true }, (err, reservations) => {
                if (err)
                    console.log(err);
                console.log(reservations);
                var newAvailable = available - reservations.length;
                if (newAvailable < 0)
                    newAvailable = 0;
                var newRentals = Math.max(available, reservations.length);
                book_1.default.findOneAndUpdate({ 'id': id }, {
                    $set: {
                        'title': title, 'authors': authors, 'genre': genre,
                        'publisher': publisher, 'publishYear': publishYear, 'language': language, 'available': newAvailable,
                        'image': image
                    }, $inc: { 'rentals': newRentals, 'totalRentals': newRentals }
                }, (err, book) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log(reservations);
                        for (let reservation of reservations) {
                            console.log("REZERVACIJA " + reservation);
                            deadline_1.default.findOne({ 'name': 'deadline' }, (err, deadline) => {
                                let rental = {
                                    book: book,
                                    daysLeft: deadline.deadline,
                                    rentalDate: new Date(),
                                    hasExtended: false
                                };
                                var targetUsername = reservation.username;
                                var resId = reservation.id;
                                user_1.default.findOneAndUpdate({ 'username': targetUsername }, { $push: { 'rentals': rental } }, (err, user) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        console.log(targetUsername);
                                        reservation_1.default.deleteOne({ 'id': resId }, (err, resp) => {
                                            if (err)
                                                console.log(err);
                                        });
                                        var flag = true;
                                        if (user.rentals.length >= 2)
                                            flag = false;
                                        for (let rental of user.rentals) {
                                            if (rental.daysLeft < 0)
                                                flag = false;
                                        }
                                        if (!flag) {
                                            reservation_1.default.updateMany({ 'username': user.username }, { $set: { 'condition': false } }, (err, resp) => {
                                                if (err)
                                                    console.log(err);
                                                //else res.json({ 'message': 'ok' });
                                            });
                                        }
                                    }
                                });
                                notification_1.default.findOne({ 'username': targetUsername }, (err, notif) => {
                                    var notification = 'Zaduzena rezervisana knjiga - ' + book.title;
                                    if (notif) {
                                        notification_1.default.updateOne({ 'username': targetUsername }, { $push: { 'notifications': notification } }, (err, resp) => {
                                            if (err)
                                                console.log(err);
                                            //else res.json({ 'message': 'ok' });
                                        });
                                    }
                                    else {
                                        let newNotifModel = new notification_1.default({
                                            username: targetUsername,
                                            notifications: [notification]
                                        });
                                        newNotifModel.save((err, resp) => {
                                            if (err)
                                                console.log(err);
                                            //else res.json({ 'message': 'ok' });
                                        });
                                    }
                                });
                            });
                        }
                        res.json({ 'message': 'ok' });
                    }
                });
            }).sort({ 'id': 1 }).limit(available);
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
            reservation_1.default.find({ 'bookId': id, 'condition': true }, (err, reservations) => {
                if (err)
                    console.log(err);
                console.log(reservations);
                var newAvailable = available - reservations.length;
                if (newAvailable < 0)
                    newAvailable = 0;
                var newRentals = Math.max(available, reservations.length);
                book_1.default.findOneAndUpdate({ 'id': id }, {
                    $set: {
                        'title': title, 'authors': authors, 'genre': genre,
                        'publisher': publisher, 'publishYear': publishYear, 'language': language, 'available': newAvailable
                    }, $inc: { 'rentals': newRentals, 'totalRentals': newRentals }
                }, (err, book) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log(reservations);
                        for (let reservation of reservations) {
                            console.log("REZERVACIJA " + reservation);
                            deadline_1.default.findOne({ 'name': 'deadline' }, (err, deadline) => {
                                let rental = {
                                    book: book,
                                    daysLeft: deadline.deadline,
                                    rentalDate: new Date(),
                                    hasExtended: false
                                };
                                var targetUsername = reservation.username;
                                var resId = reservation.id;
                                user_1.default.findOneAndUpdate({ 'username': targetUsername }, { $push: { 'rentals': rental } }, (err, user) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        console.log(targetUsername);
                                        reservation_1.default.deleteOne({ 'id': resId }, (err, resp) => {
                                            if (err)
                                                console.log(err);
                                        });
                                        var flag = true;
                                        if (user.rentals.length >= 2)
                                            flag = false;
                                        for (let rental of user.rentals) {
                                            if (rental.daysLeft < 0)
                                                flag = false;
                                        }
                                        if (!flag) {
                                            reservation_1.default.updateMany({ 'username': user.username }, { $set: { 'condition': false } }, (err, resp) => {
                                                if (err)
                                                    console.log(err);
                                                //else res.json({ 'message': 'ok' });
                                            });
                                        }
                                    }
                                });
                                notification_1.default.findOne({ 'username': targetUsername }, (err, notif) => {
                                    var notification = 'Zaduzena rezervisana knjiga - ' + book.title;
                                    if (notif) {
                                        notification_1.default.updateOne({ 'username': targetUsername }, { $push: { 'notifications': notification } }, (err, resp) => {
                                            if (err)
                                                console.log(err);
                                            //else res.json({ 'message': 'ok' });
                                        });
                                    }
                                    else {
                                        let newNotifModel = new notification_1.default({
                                            username: targetUsername,
                                            notifications: [notification]
                                        });
                                        newNotifModel.save((err, resp) => {
                                            if (err)
                                                console.log(err);
                                            //else res.json({ 'message': 'ok' });
                                        });
                                    }
                                });
                            });
                        }
                        res.json({ 'message': 'ok' });
                    }
                });
            }).sort({ 'id': 1 }).limit(available);
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
                    deadline_1.default.findOne({ 'name': 'deadline' }, (err, deadline) => {
                        if (err)
                            console.log(err);
                        else {
                            let rental = {
                                book: book,
                                daysLeft: deadline.deadline,
                                rentalDate: new Date(),
                                hasExtended: false
                            };
                            user_1.default.findOneAndUpdate({ 'username': username }, { $push: { 'rentals': rental } }, (err, user) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    var flag = true;
                                    console.log(user.rentals);
                                    if (user.rentals.length >= 2)
                                        flag = false;
                                    for (let rental of user.rentals) {
                                        if (rental.daysLeft < 0)
                                            flag = false;
                                    }
                                    if (!flag) {
                                        reservation_1.default.updateMany({ 'username': user.username }, { $set: { 'condition': false } }, (err, resp) => {
                                            if (err)
                                                console.log(err);
                                            //else res.json({ 'message': 'ok' });
                                        });
                                    }
                                }
                            });
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
                    user_1.default.findOneAndUpdate({ 'username': username }, { $set: { 'rentals': rentals } }, (err, user) => {
                        if (err)
                            console.log(err);
                        else {
                            var flag = true;
                            for (let rental of user.rentals) {
                                if (rental.daysLeft < 0)
                                    flag = false;
                            }
                            reservation_1.default.updateMany({ 'username': user.username }, { $set: { 'condition': flag } }, (err, resp) => {
                                if (err)
                                    console.log(err);
                            });
                        }
                    });
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
                                                //res.json({ 'message': 'ok' });
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
                                        //res.json({ 'message': 'ok' });
                                    }
                                });
                            }
                        }
                    });
                }
            });
            reservation_1.default.find({ 'bookId': id }, (err, reservations) => {
                if (err)
                    console.log(err);
                else {
                    var targetUsername = null;
                    var minId = Number.MAX_SAFE_INTEGER;
                    for (let reservation of reservations) {
                        if (reservation.condition && reservation.id < minId) {
                            minId = reservation.id;
                            targetUsername = reservation.username;
                        }
                    }
                    console.log(targetUsername);
                    if (targetUsername == null) {
                        book_1.default.updateOne({ 'id': id }, { $inc: { 'available': 1, 'rentals': -1 } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'ok' });
                        });
                    }
                    else {
                        book_1.default.findOne({ 'id': id }, (err, book) => {
                            if (err)
                                console.log(err);
                            else {
                                deadline_1.default.findOne({ 'name': 'deadline' }, (err, deadline) => {
                                    let rental = {
                                        book: book,
                                        daysLeft: deadline.deadline,
                                        rentalDate: new Date(),
                                        hasExtended: false
                                    };
                                    user_1.default.findOneAndUpdate({ 'username': targetUsername }, { $push: { 'rentals': rental } }, (err, user) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            reservation_1.default.deleteOne({ 'id': minId }, (err, resp) => {
                                                if (err)
                                                    console.log(err);
                                            });
                                            var flag = true;
                                            if (user.rentals.length >= 2)
                                                flag = false;
                                            for (let rental of user.rentals) {
                                                if (rental.daysLeft < 0)
                                                    flag = false;
                                            }
                                            if (!flag) {
                                                reservation_1.default.updateMany({ 'username': user.username }, { $set: { 'condition': false } }, (err, resp) => {
                                                    if (err)
                                                        console.log(err);
                                                    //else res.json({ 'message': 'ok' });
                                                });
                                            }
                                        }
                                    });
                                    notification_1.default.findOne({ 'username': targetUsername }, (err, notif) => {
                                        var notification = 'Zaduzena rezervisana knjiga - ' + book.title;
                                        if (notif) {
                                            notification_1.default.updateOne({ 'username': targetUsername }, { $push: { 'notifications': notification } }, (err, resp) => {
                                                if (err)
                                                    console.log(err);
                                                else
                                                    res.json({ 'message': 'ok' });
                                            });
                                        }
                                        else {
                                            let newNotifModel = new notification_1.default({
                                                username: targetUsername,
                                                notifications: [notification]
                                            });
                                            newNotifModel.save((err, resp) => {
                                                if (err)
                                                    console.log(err);
                                                else
                                                    res.json({ 'message': 'ok' });
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                }
            });
        };
        this.advancedSearch = (req, res) => {
            let searchParam = req.body.searchParam;
            let genre = req.body.genre;
            let publishYear = req.body.publishYear;
            let publisher = req.body.publisher;
            var regexBasic = new RegExp([searchParam].join(""), "i");
            var regexPublisher = new RegExp([publisher].join(""), "i");
            let years = publishYear.split('-');
            var yearLow;
            var yearHigh;
            if (years[0] == '')
                yearLow = 0;
            else
                yearLow = parseInt(years[0]);
            if (years[1] == '')
                yearHigh = Number.MAX_SAFE_INTEGER;
            else
                yearHigh = parseInt(years[1]);
            book_1.default.find({ $or: [{ title: regexBasic, publisher: regexPublisher }, { authors: regexBasic, publisher: regexPublisher }] }, (err, books) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var results = books.filter((value, index, arr) => {
                        if (genre != '' && !value.genre.includes(genre, 0))
                            return false;
                        if (value.publishYear < yearLow || value.publishYear > yearHigh)
                            return false;
                        return true;
                    });
                    res.json(results);
                }
            });
        };
        this.makeReservation = (req, res) => {
            let username = req.body.username;
            let id = req.body.id;
            bookCounter_1.default.findOneAndUpdate({ 'name': 'nextResId' }, { $inc: { 'nextId': 1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    user_1.default.findOne({ 'username': username }, (err, user) => {
                        if (err)
                            console.log(err);
                        else {
                            var condition = true;
                            if (user.rentals.length >= 3) {
                                condition = false;
                            }
                            else {
                                for (let rental of user.rentals) {
                                    if (rental.daysLeft < 0)
                                        condition = false;
                                }
                            }
                            let reservation = new reservation_1.default({
                                id: resp.nextId,
                                username: username,
                                bookId: id,
                                condition: condition
                            });
                            reservation.save((err, resp) => {
                                if (err)
                                    console.log(err);
                                else
                                    res.json({ 'message': 'ok' });
                            });
                        }
                    });
                }
            });
        };
        this.addComment = (req, res) => {
            let username = req.body.username;
            let id = req.body.id;
            let rating = req.body.rating;
            let text = req.body.text;
            rentingHistory_1.default.findOne({ 'username': username }, (err, history) => {
                if (err)
                    console.log(err);
                else {
                    var hasRented = false;
                    for (let record of history.rentalRecords) {
                        if (record.id == id) {
                            hasRented = true;
                            break;
                        }
                    }
                    if (hasRented) {
                        let comment = {
                            username: username,
                            rating: parseInt(rating),
                            text: text,
                            datetime: new Date(),
                            edited: false
                        };
                        book_1.default.updateOne({ 'id': id }, { $push: { 'comments': comment } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'ok' });
                        });
                    }
                    else {
                        res.json({ 'message': 'Korisnik nije zaduzivao knjigu!' });
                    }
                }
            });
        };
        this.updateComment = (req, res) => {
            let username = req.body.username;
            let id = req.body.id;
            let rating = req.body.rating;
            let text = req.body.text;
            book_1.default.findOne({ 'id': id }, (err, book) => {
                if (err)
                    console.log(err);
                else {
                    for (let i = 0; i < book.comments.length; i++) {
                        if (book.comments[i].username == username) {
                            book.comments[i].rating = rating;
                            book.comments[i].text = text;
                            book.comments[i].edited = true;
                            break;
                        }
                    }
                    book_1.default.updateOne({ 'id': id }, { $set: { 'comments': book.comments } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map