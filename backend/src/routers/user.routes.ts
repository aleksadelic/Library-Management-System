import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

/*userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)*/

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/getUserImage').post(
    (req, res) => new UserController().getUserImage(req, res)
)

userRouter.route('/getMyRentals').post(
    (req, res) => new UserController().getMyRentals(req, res)
)

userRouter.route('/rentBook').post(
    (req, res) => new UserController().rentBook(req, res)
)

userRouter.route('/checkUserRentals').post(
    (req, res) => new UserController().checkUserRentals(req, res)
)

userRouter.route('/getRentingHistory').post(
    (req, res) => new UserController().getRentingHistory(req, res)
)

export default userRouter;