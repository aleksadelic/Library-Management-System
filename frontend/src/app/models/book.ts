import { Comment } from "./comment";

export class Book {
    title: string;
    authors: string[];
    rentals: number;
    comments: Comment[];
    available: number;
    genre: string[];
    publisher: string;
    publishYear: number;
    language: string;
    image: any;
}