import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Notification = new Schema({
    username: {
        type: String
    },
    notifications: {
        type: Array
    }
});

export default mongoose.model('NotificationModel', Notification, 'notifications');