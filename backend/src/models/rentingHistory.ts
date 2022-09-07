import mongoose from "mongoose";

const Schema = mongoose.Schema;

let RentingHistory = new Schema({
    username: {
        type: String
    },
    rentalRecords: {
        type: Array
    }
});

export default mongoose.model('RentingHistoryModel', RentingHistory, 'rentingHistory');