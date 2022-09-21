import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { BookImage } from '../models/bookImage';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.user = JSON.parse(localStorage.getItem('logged in'));
  }

  books: Book[] = [];
  user: User;

  getAllBooks() {
    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.getBookImages();
    })
  }

  bookImages: BookImage[] = [];

  getBookImages() {
    for (var i = 0; i < this.books.length; i++) {
      let book = this.books[i];
      console.log(book);
      this.bookService.getBookImage(this.books[i].id).subscribe((image: Blob) => {
        console.log(image);
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          var res = reader.result;
          let bookImage = new BookImage(book, res);
          this.bookImages.push(bookImage)
        }, false)
        reader.readAsDataURL(image);
      })
    }
  }

}
