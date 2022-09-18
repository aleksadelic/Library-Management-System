import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let BookCounter = new Schema({
    name: {
        type: String
    },
    nextId: {
        type: Number
    }
});

export default mongoose.model('BookCounterModel', BookCounter, 'bookCounter');