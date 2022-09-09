"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const book_1 = __importDefault(require("../models/book"));
const rentingHistory_1 = __importDefault(require("../models/rentingHistory"));
class UserController {
    constructor() {
        this.register = (req, res, filename) => {
            let username = req.body.data[0];
            let email = req.body.data[6];
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user) {
                        res.json({ "message": "Korisnik sa zadatim korisnickim imenom vec postoji!" });
                    }
                    else {
                        user_1.default.findOne({ 'email': email }, (err, user) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                if (user) {
                                    res.json({ "message": "Korisnik sa zadatim e-mail vec postoji!" });
                                }
                                else {
                                    let user = new user_1.default({
                                        username: req.body.data[0],
                                        password: req.body.data[1],
                                        firstname: req.body.data[2],
                                        lastname: req.body.data[3],
                                        address: req.body.data[4],
                                        tel: req.body.data[5],
                                        email: req.body.data[6],
                                        type: 0,
                                        image: filename
                                    });
                                    user.save((err, resp) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            res.json({ "message": "ok" });
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(user);
                }
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let oldPassword = req.body.oldPassword;
            let newPassword = req.body.newPassword;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user.password == oldPassword) {
                        user_1.default.updateOne({ 'username': username }, { $set: { 'password': newPassword } }, (err, resp) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json({ "message": "ok" });
                            }
                        });
                    }
                    else {
                        res.json({ "message": "error" });
                    }
                }
            });
        };
        this.uploadImage = (req, res) => {
            console.log(req.body);
            res.json({ message: "Uspesno uploadovan fajl!" });
        };
        this.getUserImage = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(user);
                    if (user.image == null)
                        user.image = 'default.png';
                    var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\user_images\\' + user.image;
                    res.sendFile(filepath);
                }
            });
        };
        this.getMyRentals = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(user.rentals);
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
                        daysLeft: 30
                    };
                    user_1.default.updateOne({ 'username': username }, { $push: { 'rentals': rental } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    book_1.default.updateOne({ 'title': book.title }, { $inc: { 'available': -1, 'rentals': 1 } }, (err, resp) => {
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
        this.checkUserRentals = (req, res) => {
            let username = req.body.username;
            let title = req.body.title;
            console.log(title);
            let messages = [];
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user == null) {
                        res.json({ 'message': 'error' });
                        return;
                    }
                    if (user.rentals.length >= 3) {
                        messages.push('Maksimalan broj knjiga zaduzen!');
                    }
                    for (var i = 0; i < user.rentals.length; i++) {
                        if (user.rentals[i].daysLeft < 0) {
                            messages.push('Postoje zaduzenja za koja je istekao rok!');
                        }
                        console.log(title + ' = ' + user.rentals[i].book.title);
                        if (user.rentals[i].book.title === title) {
                            messages.push('Knjiga je vec zaduzena!');
                        }
                    }
                    res.json(messages);
                }
            });
        };
        this.getRentingHistory = (req, res) => {
            let username = req.body.username;
            rentingHistory_1.default.findOne({ 'username': username }, (err, rentingHistory) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(rentingHistory);
                    res.json(rentingHistory.rentalRecords);
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map