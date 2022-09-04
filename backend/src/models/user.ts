import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    }, 
    password: {
        type: String
    }, 
    firstname: {
        type: String
    }, 
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    tel: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: Number
    }, 
    image: {
        type: String
    }
});

export default mongoose.model('UserModel', User, 'users');