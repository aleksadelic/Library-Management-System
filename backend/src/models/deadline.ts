import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Deadline = new Schema({
    name: {
        type: String
    },
    deadline: {
        type: Number
    },
    extension: {
        type: Number
    }
});

export default mongoose.model('DeadlineModel', Deadline, 'deadline');