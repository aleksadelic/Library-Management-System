import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { BookImage } from '../models/bookImage';
import { User } from '../models/user';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
    this.myBook = JSON.parse(localStorage.getItem('myBook'));
    localStorage.removeItem('myBook');
    this.book = this.myBook.book;
    this.url = this.myBook.url;
    this.noComments = this.book.comments == null;
  }

  myBook: BookImage;
  book: Book;
  url: any;
  noComments: boolean;
  user: User;

  rentBook() {
    this.bookService.rentBook(this.book, this.user.username).subscribe(resp => {
      if (resp['message'] != 'ok') {
        console.log('Neuspesno zaduzenje knjige!');
      }
    })
  }
}
