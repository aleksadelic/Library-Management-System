import e, * as express from 'express';
import UserModel from '../models/user';
import BookModel from '../models/book';
import RentingHistoryModel from '../models/rentingHistory';

export class UserController {
    register = (req: express.Request, res: express.Response, filename: String) => {
        let username = req.body.data[0];
        let email = req.body.data[6];

        UserModel.findOne({'username': username}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    res.json({"message":"Korisnik sa zadatim korisnickim imenom vec postoji!"});
                } else {
                    UserModel.findOne({'email': email}, (err, user) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (user) {
                                res.json({"message":"Korisnik sa zadatim e-mail vec postoji!"});
                            } else {
                                let user = new UserModel({
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
                                    } else {
                                        res.json({"message":"ok"});
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                res.json(user);
            }
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        UserModel.findOne({'username': username}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (user.password == oldPassword) {
                    UserModel.updateOne({'username': username}, {$set: {'password': newPassword}}, (err, resp) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({"message":"ok"});
                        }
                    })
                } else {
                    res.json({"message":"error"});
                }
            }
        })
    }

    uploadImage = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        res.json({ message: "Uspesno uploadovan fajl!"});
    }

    getUserImage = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        UserModel.findOne({'username': username}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
                if (user.image == null)
                    user.image = 'default.png';
                var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\uploads\\' + user.image;
                res.sendFile(filepath);
            }
        })
    }

    getMyRentals = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        UserModel.findOne({'username': username}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                res.json(user.rentals);
            }
        })
    }

    rentBook = (req: express.Request, res: express.Response) => {
        let book = req.body.book;
        let username = req.body.username;
        
        UserModel.findOne({'username': username}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (user == null) {
                    res.json({'message':'error'});
                    return;
                }
                let rental = {
                    book: book,
                    daysLeft: 30
                }
                UserModel.updateOne({'username': username}, {$push: {'rentals': rental}}, (err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                })
                BookModel.updateOne({'title': book.title}, {$inc: {'available': -1, 'rentals': 1}}, (err, resp) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({'message':'ok'});
                    }
                })
            }
        })
    }

    checkUserRentals = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let title = req.body.title;
        console.log(title);

        let messages: string[] = [];

        UserModel.findOne({'username': username}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (user == null) {
                    res.json({'message':'error'});
                    return;
                }
                if (user.rentals.length >= 3) {
                    messages.push('Maksimalan broj knjiga zaduzen!');
                }
                for (var i = 0; i < user.rentals.length; i++) {
                    if (user.rentals[i].daysLeft < 0) {
                        messages.push('Postoje zaduzenja za koja je istekao rok!');
                    }
                    console.log(title + ' = ' + user.rentals[i].book.title)
                    if (user.rentals[i].book.title === title) {
                        messages.push('Knjiga je vec zaduzena!');
                    }
                }
                res.json(messages);
            }
        })
    }

    getRentingHistory = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        RentingHistoryModel.findOne({'username': username}, (err, rentingHistory) => {
            if (err) {
                console.log(err);
            } else {
                console.log(rentingHistory);
                res.json(rentingHistory.rentalRecords);
            }
        })
    }

}