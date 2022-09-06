import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { BookImage } from '../models/bookImage';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService: BookService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
    this.myBook = JSON.parse(localStorage.getItem('myBook'));
    this.book = this.myBook.book;
    localStorage.removeItem('myBook');
    this.url = this.myBook.url;
    this.getBook();
    this.checkUserRentals();
    this.calculateRating();
  }

  myBook: BookImage;
  book: Book;
  url: any;
  noComments: boolean;
  user: User;
  isAvailable: boolean;
  rentingAvailable: boolean;
  rentMessage: string = "";
  messages: string[] = [];
  bookRating: string = "Nema recenzija";

  rentBook() {
    this.bookService.rentBook(this.book, this.user.username).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.rentMessage = "Knjiga uspesno zaduzena!";
      } else {
        this.rentMessage = "Neuspesno zaduzenje knjige!"
      }
    })
  }

  checkUserRentals() {
    this.userService.checkUserRentals(this.user.username, this.book.title).subscribe((resp: string[]) => {
      if (resp.length == 0) {
        this.rentingAvailable = true;
      } else {
        this.messages = resp;
        this.rentingAvailable = false;
      }
    })
  }

  getBook() {
    this.bookService.getBook(this.book.title).subscribe((book: Book) => {
      this.book = book;
      this.myBook.book = book;
      this.isAvailable = book.available > 0;
      this.noComments = book.comments == null || book.comments.length == 0;
    })
  }

  calculateRating() {
    if (this.book.comments != null && this.book.comments.length != 0) {
      let rating = 0;
      for (var i = 0; i < this.book.comments.length; i++) {
        rating += this.book.comments[i].rating;
      }
      rating /= this.book.comments.length;
      this.bookRating = rating.toString();
    }
  }

}
