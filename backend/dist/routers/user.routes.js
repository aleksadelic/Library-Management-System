"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
/*userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)*/
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/adminLogin').post((req, res) => new user_controller_1.UserController().adminLogin(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/getUserImage').post((req, res) => new user_controller_1.UserController().getUserImage(req, res));
userRouter.route('/getMyRentals').post((req, res) => new user_controller_1.UserController().getMyRentals(req, res));
userRouter.route('/rentBook').post((req, res) => new user_controller_1.UserController().rentBook(req, res));
userRouter.route('/checkUserRentals').post((req, res) => new user_controller_1.UserController().checkUserRentals(req, res));
userRouter.route('/getRentingHistory').post((req, res) => new user_controller_1.UserController().getRentingHistory(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map