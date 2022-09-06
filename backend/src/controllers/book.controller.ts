import e, * as express from 'express';
import { Db } from 'mongodb';
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
        }).sort({"rentals": -1}).limit(3);
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
                var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\book_images\\' + book.image;
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
}