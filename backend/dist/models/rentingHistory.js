"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let RentingHistory = new Schema({
    username: {
        type: String
    },
    rentalRecords: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('RentingHistoryModel', RentingHistory, 'rentingHistory');
//# sourceMappingURL=rentingHistory.js.map