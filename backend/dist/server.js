"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookStorage = exports.userStorage = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_routes_1 = __importDefault(require("./routers/book.routes"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const user_controller_1 = require("./controllers/user.controller");
const book_controller_1 = require("./controllers/book.controller");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/libraryDB');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
var fileName = '';
const multer = require("multer");
exports.userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './user_images');
    },
    filename: (req, file, cb) => {
        //console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        var date = Date.now();
        cb(null, 'image-' + date + '.' + filetype);
        fileName = 'image-' + date + '.' + filetype;
    }
});
exports.bookStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './book_images');
    },
    filename: (req, file, cb) => {
        //console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        var date = Date.now();
        cb(null, 'image-' + date + '.' + filetype);
        fileName = 'image-' + date + '.' + filetype;
    }
});
const uploadUserImage = multer({ storage: exports.userStorage });
const uploadBookImage = multer({ storage: exports.bookStorage });
app.post('/users/register', uploadUserImage.single('file'), (req, res) => new user_controller_1.UserController().register(req, res, fileName));
app.post('/users/addUser', uploadUserImage.single('file'), (req, res) => new user_controller_1.UserController().addUser(req, res, fileName));
app.post('/books/addBook', uploadBookImage.single('file'), (req, res) => new book_controller_1.BookController().addBook(req, res, fileName));
app.post('/books/updateBookAndImage', uploadBookImage.single('file'), (req, res) => new book_controller_1.BookController().updateBookAndImage(req, res, fileName));
app.post('/users/updateUserAndImage', uploadUserImage.single('file'), (req, res) => new user_controller_1.UserController().updateUserAndImage(req, res, fileName));
const router = express_1.default.Router();
router.use('/books', book_routes_1.default);
router.use('/users', user_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map