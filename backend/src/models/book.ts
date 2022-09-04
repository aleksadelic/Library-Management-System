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
    image: {
        type: String
    }
});

export default mongoose.model('BookModel', Book, 'books');