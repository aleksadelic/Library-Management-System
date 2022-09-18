import { Comment } from "./comment";

export class Book {
    id: number;
    title: string;
    authors: string[];
    rentals: number;
    totalRentals: number;
    comments: Comment[];
    available: number;
    genre: string[];
    publisher: string;
    publishYear: number;
    language: string;
    image: any;
}