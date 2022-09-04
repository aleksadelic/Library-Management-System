import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import bookRouter from './routers/book.routes';
import userRouter from './routers/user.routes';
import { UserController } from './controllers/user.controller';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/libraryDB');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connected');
})

var fileName = '';
const multer = require("multer");
export var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      //console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      var date = Date.now();
      cb(null, 'image-' + date + '.' + filetype);
      fileName = 'image-' + date + '.' + filetype;
    }
});

const upload = multer({ storage: storage });
app.post('/users/register', upload.single('file'), (req, res) => new UserController().register(req, res, fileName));

const router = express.Router();
router.use('/books', bookRouter);
router.use('/users', userRouter);

app.use('/', router); 
app.listen(4000, () => console.log(`Express server running on port 4000`));