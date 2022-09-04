"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.register = (req, res, filename) => {
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
                    var filepath = 'D:\\Aleksa\\3. godina\\2. semestar\\PIA\\Projekat\\backend\\uploads\\' + user.image;
                    res.sendFile(filepath);
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map