import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Reservation = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    bookId: {
        type: Number
    },
    condition: {
        type: Boolean
    }
});

export default mongoose.model('ReservationModel', Reservation, 'reservations');