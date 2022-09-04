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

export default userRouter;