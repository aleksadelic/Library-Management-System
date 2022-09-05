import { Rental } from "./rental";

export class RentalImage {
    rental: Rental;
    image: any;

    constructor(book, image) {
        this.rental = book;
        this.image = image;
    }
}