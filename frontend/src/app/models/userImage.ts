import { User } from "./user";

export class UserImage {
    user: User;
    image: any;

    constructor(user, image) {
        this.user = user;
        this.image = image;
    }
}