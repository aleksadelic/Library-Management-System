import e, * as express from 'express';
import UserModel from '../models/user';
import BookModel from '../models/book';
import RentingHistoryModel from '../models/rentingHistory';
import RegistrationRequestModel from '../models/registrationRequest';
import NotificationModel from '../models/notification';
import DeadlineModel from '../models/deadline';

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
                                let request = new RegistrationRequestModel({
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
                        
                                request.save((err, resp) => {
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

    adminLogin = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password, 'type': 2}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                res.json(user);
            }
        })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        UserModel.find({$or: [{'type': 0}, {'type': 1}]}, (err, users) => {
            if (err) {
                console.log(err);
            } else {
                res.json(users);
            }
        })
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        UserModel.find({'username': username}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (user.rentals == null || user.rentals.length == 0) {
                    UserModel.deleteOne({'username': username}, (err, resp) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({'message':'ok'});
                        }
                    })
                } else {
                    res.json({'message':'Korisnik ima zaduzene knjige!'});
                }
            }
        })
    }

    addUser = (req: express.Request, res: express.Response, filename: String) => {
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
                                    image: filename,
                                    deadline: 14
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

    getAllRegistrationRequests = (req: express.Request, res: express.Response) => {
        RegistrationRequestModel.find({}, (err, requests) => {
            if (err) {
                console.log(err);
            } else {
                res.json(requests);
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
                if (user.image == null || user.image == "")
                    user.image = 'default.png';
                var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\user_images\\' + user.image;
                res.sendFile(filepath);
            }
        })
    }

    getRequestImage = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        RegistrationRequestModel.findOne({'username': username}, (err, request) => {
            if (err) {
                console.log(err);
            } else {
                if (request.image == null || request.image == "")
                    request.image = 'default.png';
                var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\user_images\\' + request.image;
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

    checkUserRentals = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let id = req.body.id;

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
                    console.log(id + ' = ' + user.rentals[i].book.id)
                    if (user.rentals[i].book.id == id) {
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
                if (rentingHistory != null){
                    console.log(rentingHistory);
                    res.json(rentingHistory.rentalRecords);
                }
            }
        })
    }

    updateUserAndImage = (req: express.Request, res: express.Response, filename: String) => {
        let oldUsername = req.body.data[0];
        let username = req.body.data[1];
        let password = req.body.data[2];
        let firstname = req.body.data[3];
        let lastname = req.body.data[4];
        let address = req.body.data[5];
        let tel = req.body.data[6];
        let email = req.body.data[7];
        let image = filename;

        UserModel.updateOne({'username': oldUsername}, {$set: {'username': username, 'password': password, 'firstname': firstname, 
            'lastname': lastname, 'address': address, 'tel': tel, 'email': email, 'image': image}}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    updateUserAndNotImage = (req: express.Request, res: express.Response) => {
        let oldUsername = req.body.oldUsername;
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let address = req.body.address;
        let tel = req.body.tel;
        let email = req.body.email;

        UserModel.updateOne({'username': oldUsername}, {$set: {'username': username, 'password': password, 'firstname': firstname, 
            'lastname': lastname, 'address': address, 'tel': tel, 'email': email}}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        RegistrationRequestModel.findOne({'username': username}, (err, request) => {
            if (err) {
                console.log(err);
            } else {
                let user = new UserModel({
                    username: request.username,
                    password: request.password,
                    firstname: request.firstname,
                    lastname: request.lastname,
                    address: request.address,
                    tel: request.tel,
                    email: request.email,
                    type: request.type,
                    image: request.image,
                    rentals: request.rentals,
                    deadline: 14
                });

                user.save((err, resp) => {
                    if (err) {
                        console.log(err);
                    } else {
                        RegistrationRequestModel.deleteOne({'username': username}, (err, resp) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({"message":"ok"});
                            }
                        })
                    }
                });
            }
        })
    }

    rejectRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        RegistrationRequestModel.deleteOne({'username': username}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({"message":"ok"});
            }
        })
    }

    promoteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        UserModel.updateOne({'username': username}, {$set: {'type': 1}}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    demoteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        UserModel.updateOne({'username': username}, {$set: {'type': 0}}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    blockUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        UserModel.updateOne({'username': username}, {$set: {'blocked': true}}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    unblockUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        UserModel.updateOne({'username': username}, {$set: {'blocked': false}}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    updateDeadline = (req: express.Request, res: express.Response) => {
        let deadline = req.body.deadline;
        let extension = req.body.extension;
        DeadlineModel.updateOne({'name': 'deadline'}, {$set: {'deadline': deadline, 'extension': extension}}, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                res.json({'message':'ok'});
            }
        })
    }

    getDeadline = (req: express.Request, res: express.Response) => {
        DeadlineModel.findOne({'name': 'deadline'}, (err, deadline) => {
            if (err) {
                console.log(err);
            } else {
                res.json(deadline);
            }
        })
    }

    extendDeadline = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let id = req.body.id;
        UserModel.findOne({'username': username}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                DeadlineModel.findOne({'name': 'deadline'}, (err, deadline) => {
                    if (err) console.log(err);
                    else {
                        for (let i = 0; i < user.rentals.length; i++) {
                            if (user.rentals[i].book.id == id) {
                                user.rentals[i].hasExtended = true;
                                user.rentals[i].daysLeft += deadline.extension;
                            }
                        }
                        UserModel.updateOne({'username': username}, {$set: {'rentals': user.rentals}}, (err, resp) => {
                            if (err) console.log(err);
                            else res.json({'message':'ok'});
                        })
                    }
                })
            }
        })
    }

    getUsersNotifications = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        var messages: string[] = [];

        UserModel.findOne({'username': username}, (err, user) => {
            if (err) console.log(err);
            else {
                for (let i = 0; i < user.rentals.length; i++) {
                    if (user.rentals[i].daysLeft <= 2 && user.rentals[i].daysLeft >= 0) {
                        messages.push('Istice rok za vracanje knjige ' + user.rentals[i].book.title);
                    } else if (user.rentals[i].daysLeft < 0) {
                        messages.push('Istekao rok za vracanje knjige ' + user.rentals[i].book.title);
                    }
                }
                if (user.rentals.length == 3) {
                    messages.push('Korisnik ima maksimalan broj knjiga na zaduzenju!');
                }
                if (user.blocked) {
                    messages.push('Korisnik je blokiran!!!');
                }
                NotificationModel.findOne({'username': username}, (err, notif) => {
                    if (err) console.log(err);
                    else {
                        if (notif && notif.notifications) {
                            messages = messages.concat(notif.notifications);
                        }
                        res.json(messages);
                    }
                })
            }
        })
    }

    getNumberOfReadBooksInLastYear = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        RentingHistoryModel.findOne({'username': username}, (err, record) => {
            if (err) console.log(err);
            else {

            }
        })
    }

    getNumberOfReadBooksByGenre = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        RentingHistoryModel.findOne({'username': username}, (err, record) => {
            if (err) console.log(err);
            else {
                
            }
        })
    }

}