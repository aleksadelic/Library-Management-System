import e, * as express from 'express';
import { Db } from 'mongodb';
import BookRequestModel from '../models/bookRequest';
import BookModel from '../models/book';
import BookCounterModel from '../models/bookCounter';
import UserModel from '../models/user';
import RentingHistoryModel from '../models/rentingHistory';
import NotificationModel from '../models/notification';
import book from '../models/book';
import DeadlineModel from '../models/deadline';
import ReservationModel from '../models/reservation';
import reservation from '../models/reservation';

const fs = require('fs');

export class BookController {

    getTop3Books = (req: express.Request, res: express.Response) => {
        BookModel.find({}, (err, books) => {
            if (err) {
                console.log(err);
            } else {
                res.json(books);
            }
        }).sort({ "totalRentals": -1 }).limit(3);
    }

    getBookOfTheDay = (req: express.Request, res: express.Response) => {
        BookModel.count().exec((err, count) => {
            var random = Math.floor(Math.random() * count);

            BookModel.findOne().skip(random).exec((err, book) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(book);
                }
            })
        })
    }

    getBookImage = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        BookModel.findOne({ 'id': id }, (err, book) => {
            if (err) {
                console.log(err);
            } else {
                var filepath;
                if (book.image == null || book.image == "") {
                    filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\book_images\\default.jpg';
                } else {
                    filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\book_images\\' + book.image;
                }
                res.sendFile(filepath);
            }
        })
    }

    searchBooks = (req: express.Request, res: express.Response) => {
        let searchParam = req.body.searchParam;
        console.log(searchParam);
        var regex = new RegExp([searchParam].join(""), "i");
        BookModel.find({ $or: [{ title: regex }, { authors: regex }] }, (err, books) => {
            if (err) {
                console.log(err);
            } else {
                res.json(books);
            }
        })
    }

    getBook = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        BookModel.findOne({ 'id': id }, (err, book) => {
            if (err) {
                console.log(err);
            } else {
                res.json(book);
            }
        })
    }

    addBook = (req: express.Request, res: express.Response, filename: String) => {
        let authors: string[] = req.body.data[1].split(',');
        let genre: string[] = req.body.data[2].split(',', 3);
        BookCounterModel.findOneAndUpdate({ 'name': 'nextBookId' }, { $inc: { 'nextId': 1 } }, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                var nextId = resp.nextId;
                let book = new BookModel({
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
                })

                book.save((err, resp) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ 'message': 'ok' });
                    }
                })
            }
        })
    }

    updateBookAndImage = (req: express.Request, res: express.Response, filename: String) => {
        let id = req.body.data[0];
        let title = req.body.data[1];
        let authors = req.body.data[2];
        let genre = req.body.data[3];
        let publisher = req.body.data[4];
        let publishYear = req.body.data[5];
        let language = req.body.data[6];
        let available = req.body.data[7];
        let image = filename;

        BookModel.updateOne({ 'id': id }, {
            $set: {
                'title': title, 'authors': authors, 'genre': genre,
                'publisher': publisher, 'publishYear': publishYear, 'language': language, 'available': available,
                'image': image
            }
        }, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ 'message': 'ok' });
            }
        })
    }

    updateBookAndNotImage = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let title = req.body.title;
        let authors = req.body.authors;
        let genre = req.body.genre;
        let publisher = req.body.publisher;
        let publishYear = req.body.publishYear;
        let language = req.body.language;
        let available = req.body.available;

        ReservationModel.find({ 'bookId': id, 'condition': true }, (err, reservations) => {
            if (err) console.log(err);
            console.log(reservations);
            if (reservations.length >= available) {
                BookModel.findOneAndUpdate({ 'id': id }, {
                    $set: {
                        'title': title, 'authors': authors, 'genre': genre,
                        'publisher': publisher, 'publishYear': publishYear, 'language': language, 'available': 0
                    }, $inc: { 'rentals': available, 'totalRentals': available }
                }, (err, book) => {
                    if (err) console.log(err);
                    else {
                        console.log(reservations);
                        for (let reservation of reservations) {
                            console.log("REZERVACIJA " + reservation);
                            DeadlineModel.findOne({ 'name': 'deadline' }, (err, deadline) => {
                                let rental = {
                                    book: book,
                                    daysLeft: deadline.deadline,
                                    rentalDate: new Date(),
                                    hasExtended: false
                                }
                                var targetUsername = reservation.username;
                                var resId = reservation.id;
                                UserModel.findOneAndUpdate({ 'username': targetUsername }, { $push: { 'rentals': rental } }, (err, user) => {
                                    if (err) console.log(err);
                                    else {
                                        console.log(targetUsername);
                                        ReservationModel.deleteOne({ 'id': resId }, (err, resp) => {
                                            if (err) console.log(err);
                                        })
                                        var flag = true;
                                        if (user.rentals.length >= 2)
                                            flag = false;
                                        for (let rental of user.rentals) {
                                            if (rental.daysLeft < 0) flag = false;
                                        }
                                        if (!flag) {
                                            ReservationModel.updateMany({ 'username': user.username }, { $set: { 'condition': false } }, (err, resp) => {
                                                if (err) console.log(err);
                                                //else res.json({ 'message': 'ok' });
                                            })
                                        }
                                    }
                                })
                                NotificationModel.findOne({ 'username': targetUsername }, (err, notif) => {
                                    var notification = 'Zaduzena rezervisana knjiga - ' + book.title;
                                    if (notif) {
                                        NotificationModel.updateOne({ 'username': targetUsername }, { $push: { 'notifications': notification } }, (err, resp) => {
                                            if (err) console.log(err);
                                            //else res.json({ 'message': 'ok' });
                                        })
                                    } else {
                                        let newNotifModel = new NotificationModel({
                                            username: targetUsername,
                                            notifications: [notification]
                                        });
                                        newNotifModel.save((err, resp) => {
                                            if (err) console.log(err);
                                            //else res.json({ 'message': 'ok' });
                                        })
                                    }

                                })
                            })

                        }
                        res.json({ 'message': 'ok' });
                    }
                })
            } else {
                BookModel.findOneAndUpdate({ 'id': id }, {
                    $set: {
                        'title': title, 'authors': authors, 'genre': genre,
                        'publisher': publisher, 'publishYear': publishYear, 'language': language, 'available': available - reservations.length
                    }, $inc: { 'rentals': reservations.length, 'totalRentals': reservations.length }
                }, (err, book) => {
                    if (err) console.log(err);
                    else {
                        console.log(reservations);
                        for (let reservation of reservations) {
                            console.log("REZERVACIJA " + reservation);
                            DeadlineModel.findOne({ 'name': 'deadline' }, (err, deadline) => {
                                let rental = {
                                    book: book,
                                    daysLeft: deadline.deadline,
                                    rentalDate: new Date(),
                                    hasExtended: false
                                }
                                var targetUsername = reservation.username;
                                var resId = reservation.id;
                                UserModel.findOneAndUpdate({ 'username': targetUsername }, { $push: { 'rentals': rental } }, (err, user) => {
                                    if (err) console.log(err);
                                    else {
                                        console.log(targetUsername);
                                        ReservationModel.deleteOne({ 'id': resId }, (err, resp) => {
                                            if (err) console.log(err);
                                        })
                                        var flag = true;
                                        if (user.rentals.length >= 2)
                                            flag = false;
                                        for (let rental of user.rentals) {
                                            if (rental.daysLeft < 0) flag = false;
                                        }
                                        if (!flag) {
                                            ReservationModel.updateMany({ 'username': user.username }, { $set: { 'condition': false } }, (err, resp) => {
                                                if (err) console.log(err);
                                                //else res.json({ 'message': 'ok' });
                                            })
                                        }
                                    }
                                })
                                NotificationModel.findOne({ 'username': targetUsername }, (err, notif) => {
                                    var notification = 'Zaduzena rezervisana knjiga - ' + book.title;
                                    if (notif) {
                                        NotificationModel.updateOne({ 'username': targetUsername }, { $push: { 'notifications': notification } }, (err, resp) => {
                                            if (err) console.log(err);
                                            //else res.json({ 'message': 'ok' });
                                        })
                                    } else {
                                        let newNotifModel = new NotificationModel({
                                            username: targetUsername,
                                            notifications: [notification]
                                        });
                                        newNotifModel.save((err, resp) => {
                                            if (err) console.log(err);
                                            //else res.json({ 'message': 'ok' });
                                        })
                                    }

                                })
                            })

                        }
                        res.json({ 'message': 'ok' });
                    }
                })
            }
        }).sort({'id': 1}).limit(available);


    }

    getAllBooks = (req: express.Request, res: express.Response) => {
        BookModel.find({}, (err, books) => {
            if (err) {
                console.log(err);
            } else {
                res.json(books);
            }
        })
    }

    deleteBook = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        BookModel.findOne({ 'id': id }, (err, book) => {
            if (err) {
                console.log(err);
            } else {
                if (book.rentals == 0) {
                    BookModel.deleteOne({ 'id': id }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ 'message': 'ok' });
                        }
                    })
                } else {
                    res.json({ 'message': 'Postoje zaduzenja knjige!' });
                }
            }
        })
    }

    addBookRequest = (req: express.Request, res: express.Response, filename: String) => {
        let authors: string[] = req.body.data[2].split(',');
        let genre: string[] = req.body.data[3].split(',', 3);
        BookCounterModel.findOneAndUpdate({ 'name': 'nextReqId' }, { $inc: { 'nextId': 1 } }, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                var nextId = resp.nextId;
                let bookRequest = new BookRequestModel({
                    id: nextId,
                    username: req.body.data[0],
                    title: req.body.data[1],
                    authors: authors,
                    genre: genre,
                    publisher: req.body.data[4],
                    publishYear: req.body.data[5],
                    language: req.body.data[6],
                    image: filename,
                })

                bookRequest.save((err, resp) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ 'message': 'ok' });
                    }
                })
            }
        })
    }

    acceptBookRequest = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        BookRequestModel.findOne({ 'id': id }, (err, request) => {
            if (err) {
                console.log(err);
            } else {
                BookCounterModel.findOneAndUpdate({ 'name': 'nextBookId' }, { $inc: { 'nextId': 1 } }, (err, resp) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var nextId = resp.nextId;
                        let book = new BookModel({
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
                            } else {
                                BookRequestModel.deleteOne({ 'id': id }, (err, resp) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        NotificationModel.findOne({ 'username': request.username }, (err, notif) => {
                                            if (err) console.log(err);
                                            else {
                                                let newNotif = 'Knjiga koju je korisnik predlozio je dodata - ' + request.title;
                                                if (notif) {
                                                    NotificationModel.updateOne({ 'username': request.username }, { $push: { 'notifications': newNotif } }, (err, resp) => {
                                                        if (err) console.log(err);
                                                        else res.json({ 'message': 'ok' });
                                                    })
                                                } else {
                                                    let newNotifModel = new NotificationModel({
                                                        username: request.username,
                                                        notifications: [newNotif]
                                                    });
                                                    newNotifModel.save((err, resp) => {
                                                        if (err) console.log(err);
                                                        else res.json({ 'message': 'ok' });
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    rejectBookRequest = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        BookRequestModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ 'message': 'ok' });
            }
        })
    }

    getAllBookRequests = (req: express.Request, res: express.Response) => {
        BookRequestModel.find({}, (err, requests) => {
            if (err) {
                console.log(err);
            } else {
                res.json(requests);
            }
        })
    }

    getRequestImage = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        BookRequestModel.findOne({ 'id': id }, (err, request) => {
            if (err) {
                console.log(err);
            } else {
                if (request.image == null || request.image == "")
                    request.image = 'default.jpg';
                var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\book_images\\' + request.image;
                res.sendFile(filepath);
            }
        })
    }

    rentBook = (req: express.Request, res: express.Response) => {
        let book = req.body.book;
        let username = req.body.username;

        UserModel.findOne({ 'username': username }, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (user == null) {
                    res.json({ 'message': 'error' });
                    return;
                }
                DeadlineModel.findOne({ 'name': 'deadline' }, (err, deadline) => {
                    if (err) console.log(err);
                    else {
                        let rental = {
                            book: book,
                            daysLeft: deadline.deadline,
                            rentalDate: new Date(),
                            hasExtended: false
                        }
                        UserModel.findOneAndUpdate({ 'username': username }, { $push: { 'rentals': rental } }, (err, user) => {
                            if (err) {
                                console.log(err);
                            } else {
                                var flag = true;
                                console.log(user.rentals);
                                if (user.rentals.length >= 2)
                                    flag = false;
                                for (let rental of user.rentals) {
                                    if (rental.daysLeft < 0) flag = false;
                                }
                                if (!flag) {
                                    ReservationModel.updateMany({ 'username': user.username }, { $set: { 'condition': false } }, (err, resp) => {
                                        if (err) console.log(err);
                                        //else res.json({ 'message': 'ok' });
                                    })
                                }
                            }
                        })
                    }
                })
                BookModel.updateOne({ 'id': book.id }, { $inc: { 'available': -1, 'rentals': 1, 'totalRentals': 1 } }, (err, resp) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ 'message': 'ok' });
                    }
                })
            }
        })
    }

    returnBook = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let id = req.body.id;

        UserModel.findOne({ 'username': username }, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                var rental;
                for (let i = 0; i < user.rentals.length; i++) {
                    if (user.rentals[i].book.id == id) {
                        rental = user.rentals[i];
                        break;
                    }
                }

                var rentals = user.rentals.filter((value, index, arr) => {
                    return value.book.id != id;
                })

                UserModel.findOneAndUpdate({ 'username': username }, { $set: { 'rentals': rentals } }, (err, user) => {
                    if (err) console.log(err)
                    else {
                        var flag = true;
                        for (let rental of user.rentals) {
                            if (rental.daysLeft < 0) flag = false;
                        }
                        ReservationModel.updateMany({ 'username': user.username }, { $set: { 'condition': flag } }, (err, resp) => {
                            if (err) console.log(err);
                        })
                    }
                })

                let rentalRecord = {
                    title: rental.book.title,
                    id: rental.book.id,
                    authors: rental.book.authors,
                    rentalDate: rental.rentalDate,
                    returnDate: new Date()
                }

                RentingHistoryModel.findOne({ 'username': username }, (err, record) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (record == null) {
                            let newRecord = new RentingHistoryModel({
                                username: username,
                                rentalRecords: []
                            });
                            newRecord.save((err, resp) => {
                                if (err) console.log(err);
                                else {
                                    RentingHistoryModel.updateOne({ 'username': username }, { $push: { 'rentalRecords': rentalRecord } }, (err, resp) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            //res.json({ 'message': 'ok' });
                                        }
                                    })
                                }
                            })
                        } else {
                            RentingHistoryModel.updateOne({ 'username': username }, { $push: { 'rentalRecords': rentalRecord } }, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    //res.json({ 'message': 'ok' });
                                }
                            })
                        }
                    }
                })
            }
        });

        ReservationModel.find({ 'bookId': id }, (err, reservations) => {
            if (err) console.log(err);
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
                    BookModel.updateOne({ 'id': id }, { $inc: { 'available': 1, 'rentals': -1 } }, (err, resp) => {
                        if (err) console.log(err);
                        else res.json({ 'message': 'ok' })
                    })
                } else {
                    BookModel.findOne({ 'id': id }, (err, book) => {
                        if (err) console.log(err);
                        else {
                            DeadlineModel.findOne({ 'name': 'deadline' }, (err, deadline) => {
                                let rental = {
                                    book: book,
                                    daysLeft: deadline.deadline,
                                    rentalDate: new Date(),
                                    hasExtended: false
                                }
                                UserModel.findOneAndUpdate({ 'username': targetUsername }, { $push: { 'rentals': rental } }, (err, user) => {
                                    if (err) console.log(err);
                                    else {
                                        ReservationModel.deleteOne({ 'id': minId }, (err, resp) => {
                                            if (err) console.log(err);
                                        })
                                        var flag = true;
                                        if (user.rentals.length >= 2)
                                            flag = false;
                                        for (let rental of user.rentals) {
                                            if (rental.daysLeft < 0) flag = false;
                                        }
                                        if (!flag) {
                                            ReservationModel.updateMany({ 'username': user.username }, { $set: { 'condition': false } }, (err, resp) => {
                                                if (err) console.log(err);
                                                //else res.json({ 'message': 'ok' });
                                            })
                                        }
                                    }
                                })
                                NotificationModel.findOne({ 'username': targetUsername }, (err, notif) => {
                                    var notification = 'Zaduzena rezervisana knjiga - ' + book.title;
                                    if (notif) {
                                        NotificationModel.updateOne({ 'username': targetUsername }, { $push: { 'notifications': notification } }, (err, resp) => {
                                            if (err) console.log(err);
                                            else res.json({ 'message': 'ok' });
                                        })
                                    } else {
                                        let newNotifModel = new NotificationModel({
                                            username: targetUsername,
                                            notifications: [notification]
                                        });
                                        newNotifModel.save((err, resp) => {
                                            if (err) console.log(err);
                                            else res.json({ 'message': 'ok' });
                                        })
                                    }

                                })
                            })
                        }
                    })
                }
            }
        });
    }

    advancedSearch = (req: express.Request, res: express.Response) => {
        let searchParam = req.body.searchParam;
        let genre = req.body.genre;
        let publishYear = req.body.publishYear;
        let publisher = req.body.publisher;

        var regexBasic = new RegExp([searchParam].join(""), "i");
        var regexPublisher = new RegExp([publisher].join(""), "i");

        let years = publishYear.split('-');
        var yearLow: number;
        var yearHigh: number;
        if (years[0] == '') yearLow = 0;
        else yearLow = parseInt(years[0]);
        if (years[1] == '') yearHigh = Number.MAX_SAFE_INTEGER;
        else yearHigh = parseInt(years[1]);

        BookModel.find({ $or: [{ title: regexBasic, publisher: regexPublisher }, { authors: regexBasic, publisher: regexPublisher }] }, (err, books) => {
            if (err) {
                console.log(err);
            } else {
                var results = books.filter((value, index, arr) => {
                    if (genre != '' && !value.genre.includes(genre, 0)) return false;
                    if (value.publishYear < yearLow || value.publishYear > yearHigh) return false;
                    return true;
                })
                res.json(results);
            }
        })
    }

    makeReservation = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let id = req.body.id;

        BookCounterModel.findOneAndUpdate({ 'name': 'nextResId' }, { $inc: { 'nextId': 1 } }, (err, resp) => {
            if (err) console.log(err);
            else {
                UserModel.findOne({ 'username': username }, (err, user) => {
                    if (err) console.log(err);
                    else {
                        var condition = true;
                        if (user.rentals.length >= 3) {
                            condition = false;
                        } else {
                            for (let rental of user.rentals) {
                                if (rental.daysLeft < 0) condition = false;
                            }
                        }

                        let reservation = new ReservationModel({
                            id: resp.nextId,
                            username: username,
                            bookId: id,
                            condition: condition
                        });
                        reservation.save((err, resp) => {
                            if (err) console.log(err);
                            else res.json({ 'message': 'ok' });
                        })
                    }
                })
            }
        })
    }

    addComment = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let id = req.body.id;
        let rating = req.body.rating;
        let text = req.body.text;

        RentingHistoryModel.findOne({ 'username': username }, (err, history) => {
            if (err) console.log(err);
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
                    }
                    BookModel.updateOne({ 'id': id }, { $push: { 'comments': comment } }, (err, resp) => {
                        if (err) console.log(err);
                        else res.json({ 'message': 'ok' });
                    })
                } else {
                    res.json({ 'message': 'Korisnik nije zaduzivao knjigu!' });
                }
            }
        })

    }

    updateComment = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let id = req.body.id;
        let rating = req.body.rating;
        let text = req.body.text;

        BookModel.findOne({ 'id': id }, (err, book) => {
            if (err) console.log(err);
            else {
                for (let i = 0; i < book.comments.length; i++) {
                    if (book.comments[i].username == username) {
                        book.comments[i].rating = rating;
                        book.comments[i].text = text;
                        book.comments[i].edited = true
                        break;
                    }
                }
                BookModel.updateOne({ 'id': id }, { $set: { 'comments': book.comments } }, (err, resp) => {
                    if (err) console.log(err);
                    else res.json({ 'message': 'ok' });
                })
            }
        })
    }

}