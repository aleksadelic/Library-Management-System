"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('ReservationModel', Reservation, 'reservations');
//# sourceMappingURL=reservation.js.map