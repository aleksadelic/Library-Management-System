import { RentalRecord } from "./rentalRecord";

export class RentalRecordImage {
    rentalRecord: RentalRecord;
    image: any;

    constructor(rentalRecord, image) {
        this.rentalRecord = rentalRecord;
        this.image = image;
    }
}