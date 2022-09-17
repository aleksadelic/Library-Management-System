import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let RegistrationRequest = new Schema({
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
    }
});

export default mongoose.model('RegistrationRequestMode', RegistrationRequest, 'registrationRequests');