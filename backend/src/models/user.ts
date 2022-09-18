import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String, unique: true
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
        type: String, unique: true
    },
    type: {
        type: Number
    }, 
    image: {
        type: String
    },
    rentals: {
        type: Array
    },
    blocked: {
        type: Boolean
    }
});

export default mongoose.model('UserModel', User, 'users');