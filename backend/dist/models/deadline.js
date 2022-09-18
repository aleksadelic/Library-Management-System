"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('DeadlineModel', Deadline, 'deadline');
//# sourceMappingURL=deadline.js.map