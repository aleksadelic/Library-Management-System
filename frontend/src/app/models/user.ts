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
    deadline: number;

    constructor(username, password, firstname, lastname, address, tel, email, type, image, rentals, blocked, deadline) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.tel = tel;
        this.email = email;
        this.type = type;
        this.image = image;
        this.rentals = rentals;
        this.blocked = blocked;
        this.deadline = deadline;
    }
}