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
userRouter.route('/getRequestImage').post((req, res) => new user_controller_1.UserController().getRequestImage(req, res));
userRouter.route('/getMyRentals').post((req, res) => new user_controller_1.UserController().getMyRentals(req, res));
userRouter.route('/checkUserRentals').post((req, res) => new user_controller_1.UserController().checkUserRentals(req, res));
userRouter.route('/checkIfUserCanComment').post((req, res) => new user_controller_1.UserController().checkIfUserCanComment(req, res));
userRouter.route('/getRentingHistory').post((req, res) => new user_controller_1.UserController().getRentingHistory(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route('/updateUserAndNotImage').post((req, res) => new user_controller_1.UserController().updateUserAndNotImage(req, res));
userRouter.route('/getAllRegistrationRequests').get((req, res) => new user_controller_1.UserController().getAllRegistrationRequests(req, res));
userRouter.route('/acceptRequest').post((req, res) => new user_controller_1.UserController().acceptRequest(req, res));
userRouter.route('/rejectRequest').post((req, res) => new user_controller_1.UserController().rejectRequest(req, res));
userRouter.route('/promoteUser').post((req, res) => new user_controller_1.UserController().promoteUser(req, res));
userRouter.route('/demoteUser').post((req, res) => new user_controller_1.UserController().demoteUser(req, res));
userRouter.route('/blockUser').post((req, res) => new user_controller_1.UserController().blockUser(req, res));
userRouter.route('/unblockUser').post((req, res) => new user_controller_1.UserController().unblockUser(req, res));
userRouter.route('/updateDeadline').post((req, res) => new user_controller_1.UserController().updateDeadline(req, res));
userRouter.route('/getDeadline').get((req, res) => new user_controller_1.UserController().getDeadline(req, res));
userRouter.route('/getUserNotifications').post((req, res) => new user_controller_1.UserController().getUsersNotifications(req, res));
userRouter.route('/getNumberOfReadBooksInLastYear').post((req, res) => new user_controller_1.UserController().getNumberOfReadBooksInLastYear(req, res));
userRouter.route('/getNumberOfReadBooksByGenre').post((req, res) => new user_controller_1.UserController().getNumberOfReadBooksByGenre(req, res));
userRouter.route('/extendDeadline').post((req, res) => new user_controller_1.UserController().extendDeadline(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map