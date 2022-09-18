"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('BooRequestkModel', BookRequest, 'bookRequests');
//# sourceMappingURL=bookRequest.js.map