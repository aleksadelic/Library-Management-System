import e, * as express from 'express';
import { Db } from 'mongodb';
import BookRequestModel from '../models/bookRequest';
import BookModel from '../models/book';

const fs = require('fs');

export class BookController {
    getTop3Books = (req: express.Request, res: express.Response) => {
        BookModel.find({}, (err, books) => {
            if (err) {
                console.log(err);
            } else {
                res.json(books);
            }
        }).sort({"totalRentals": -1}).limit(3);
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
        let title = req.body.title;
        BookModel.findOne({'title': title}, (err, book) => {
            if (err) {
                console.log(err);
            } else {
                var filepath;
                if (book.image == "") {
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
        BookModel.find({ $or: [{title: regex}, {authors: regex}] }, (err, books) => {
            if (err) {
                console.log(err);
            } else {
                res.json(books);
            }
        })
    }

    getBook = (req: express.Request, res: express.Response) => {
        let title = req.body.title;
        BookModel.findOne({'title': title}, (err, book) => {
            if (err) {
                console.log(err);
            } else {
                res.json(book);
            }
        })
    }

    addBook = (req: express.Request, res: express.Response, filename: String) => {
        let book = new BookModel({
            title: req.body.data[0],
            authors: req.body.data[1],
            genre: req.body.data[2],
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
                res.json({'message':'ok'});
            }
        })
    }

    updateBookAndImage = (req: express.Request, res: express.Response, filename: String) => {
        let oldTitle = req.body.data[0];
        let title = req.body.data[1];
        let authors = req.body.data[2];
        let genre = req.body.data[3];
        let publisher = req.body.data[4];
        let publishYear = req.body.data[5];
        let language = req.body.data[6];
        let available = req.body.data[7];
        let image = filename;

        BookModel.updateOne({'title': oldTitle}, {$set: {'title': title, 'authors': authors, 'genre': genre, 
            'publisher': publisher, 'publishYear': publishYear, 'language': language, 'available': available, 
            'image': image}}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    updateBookAndNotImage = (req: express.Request, res: express.Response) => {
        let oldTitle = req.body.oldTitle;
        let title = req.body.title;
        let authors = req.body.authors;
        let genre = req.body.genre;
        let publisher = req.body.publisher;
        let publishYear = req.body.publishYear;
        let language = req.body.language;
        let available = req.body.available;

        BookModel.updateOne({'title': oldTitle}, {$set: {'title': title, 'authors': authors, 'genre': genre, 
            'publisher': publisher, 'publishYear': publishYear, 'language': language, 'available': available}}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
              res.json({'message':'ok'});
            }
        })
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
        let title = req.body.title;
        BookModel.findOne({'title': title}, (err, book) => {
            if (err) {
                console.log(err);
            } else {
                if (book.rentals == 0) {
                    BookModel.deleteOne({'title': title}, (err, resp) => {
                      if (err) {
                        console.log(err);
                      } else {
                        res.json({'message':'ok'});
                      }
                    })
                } else {
                    res.json({'message':'Postoje zaduzenja knjige!'});
                }
            }
        })
    }

    addBookRequest = (req: express.Request, res: express.Response, filename: String) => {
        let bookRequest = new BookRequestModel({
            title: req.body.data[0],
            authors: req.body.data[1],
            genre: req.body.data[2],
            publisher: req.body.data[3],
            publishYear: req.body.data[4],
            language: req.body.data[5],
            image: filename,
        })

        bookRequest.save((err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    acceptBookRequest = (req: express.Request, res: express.Response) => {
        let title = req.body.title;

        BookRequestModel.findOne({'title': title}, (err, request) => {
            if (err) {
                console.log(err);
            } else {
                let book = new BookModel({
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
                        BookRequestModel.deleteOne({'title': title}, (err, resp) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({'message':'ok'});
                            }
                        })
                    }
                })
            }
        })
    }

    rejectBookRequest = (req: express.Request, res: express.Response) => {
        let title = req.body.title;
        BookRequestModel.deleteOne({'title': title}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    gettAllBookRequests = (req: express.Request, res: express.Response) => {
        BookRequestModel.find({}, (err, requests) => {
            if (err) {
                console.log(err);
            } else {
                res.json(requests);
            }
        })
    }

    getRequestImage = (req: express.Request, res: express.Response) => {
        let title = req.body.title;
        BookRequestModel.findOne({'title': title}, (err, request) => {
            if (err) {
                console.log(err);
            } else {
                if (request.image == null || request.image == "")
                    request.image = 'default.png';
                var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\book_images\\' + request.image;
                res.sendFile(filepath);
            }
        })
    }

}