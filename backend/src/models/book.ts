import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema({
    title: {
        type: String
    }, 
    authors: {
        type: Array
    },
    rentals: {
        type: Number
    },
    totalRentals: {
        type: Number
    },
    image: {
        type: String
    },
    available: {
        type: Number
    },
    comments: {
        type: Array
    },
    genre: {
        type: Array
    },
    publisher: {
        type: String
    },
    publishYear: {
        type: Number
    },
    language: {
        type: String
    }
});

export default mongoose.model('BookModel', Book, 'books');