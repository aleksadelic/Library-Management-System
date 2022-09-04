import { Book } from "./book";

export class BookImage {
    book: Book;
    url: any;

    constructor(book, url) {
        this.book = book;
        this.url = url;
    }
}