"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    username: {
        type: String, unique: true
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    tel: {
        type: String
    },
    email: {
        type: String, unique: true
    },
    type: {
        type: Number
    },
    image: {
        type: String
    },
    rentals: {
        type: Array
    },
    blocked: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('UserModel', User, 'users');
//# sourceMappingURL=user.js.map