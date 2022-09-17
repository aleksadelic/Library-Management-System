import { RegistrationRequest } from "./registrationRequest";

export class RequestImage {
    request: RegistrationRequest;
    image: File;

    constructor(request, image) {
        this.request = request;
        this.image = image;
    }
}