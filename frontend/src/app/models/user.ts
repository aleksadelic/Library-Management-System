import { Rental } from "./rental";

export class User {
    username: string; // unique
    password: string;
    firstname: string;
    lastname: string;
    address: string; // street number and city
    tel: string;
    email: string; // unique
    type: number;
    image: any;
    rentals: Rental[];
    blocked: boolean;
}