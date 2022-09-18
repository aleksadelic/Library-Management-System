"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Book = new Schema({
    id: {
        type: Number
    },
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
exports.default = mongoose_1.default.model('BookModel', Book, 'books');
//# sourceMappingURL=book.js.map