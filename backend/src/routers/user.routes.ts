import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

/*userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)*/

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/adminLogin').post(
    (req, res) => new UserController().adminLogin(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/getUserImage').post(
    (req, res) => new UserController().getUserImage(req, res)
)

userRouter.route('/getRequestImage').post(
    (req, res) => new UserController().getRequestImage(req, res)
)

userRouter.route('/getMyRentals').post(
    (req, res) => new UserController().getMyRentals(req, res)
)

userRouter.route('/checkUserRentals').post(
    (req, res) => new UserController().checkUserRentals(req, res)
)

userRouter.route('/getRentingHistory').post(
    (req, res) => new UserController().getRentingHistory(req, res)
)

userRouter.route('/getAllUsers').get(
    (req, res) => new UserController().getAllUsers(req, res)
)

userRouter.route('/deleteUser').post(
    (req, res) => new UserController().deleteUser(req, res)
)

userRouter.route('/updateUserAndNotImage').post(
    (req, res) => new UserController().updateUserAndNotImage(req, res)
)

userRouter.route('/getAllRegistrationRequests').get(
    (req, res) => new UserController().getAllRegistrationRequests(req, res)
)

userRouter.route('/acceptRequest').post(
    (req, res) => new UserController().acceptRequest(req, res)
)

userRouter.route('/rejectRequest').post(
    (req, res) => new UserController().rejectRequest(req, res)
)

userRouter.route('/promoteUser').post(
    (req, res) => new UserController().promoteUser(req, res)
)

userRouter.route('/demoteUser').post(
    (req, res) => new UserController().demoteUser(req, res)
)

userRouter.route('/blockUser').post(
    (req, res) => new UserController().blockUser(req, res)
)

userRouter.route('/unblockUser').post(
    (req, res) => new UserController().unblockUser(req, res)
)

userRouter.route('/updateDeadline').post(
    (req, res) => new UserController().updateDeadline(req, res)
)

userRouter.route('/getDeadline').get(
    (req, res) => new UserController().getDeadline(req, res)
)

userRouter.route('/getUserNotifications').post(
    (req, res) => new UserController().getUsersNotifications(req, res)
)

userRouter.route('/getNumberOfReadBooksInLastYear').post(
    (req, res) => new UserController().getNumberOfReadBooksByGenre(req, res)
)

userRouter.route('/getNumberOfReadBooksByGenre').post(
    (req, res) => new UserController().getNumberOfReadBooksByGenre(req, res)
)

userRouter.route('/extendDeadline').post(
    (req, res) => new UserController().extendDeadline(req, res)
)

export default userRouter;