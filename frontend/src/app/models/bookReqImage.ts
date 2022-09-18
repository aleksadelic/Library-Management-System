import { BookRequest } from "./bookRequest";

export class BookReqImage {
    request: BookRequest;
    image: any;

    constructor(request, image) {
        this.request = request;
        this.image = image;
    }
}