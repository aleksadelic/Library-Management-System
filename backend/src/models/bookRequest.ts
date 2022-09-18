import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let BookRequest = new Schema({
    username: {
        type: String
    },
    id: {
        type: Number
    },
    title: {
        type: String
    }, 
    authors: {
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
    },
    image: {
        type: String
    }
});

export default mongoose.model('BooRequestkModel', BookRequest, 'bookRequests');