import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private bookService: BookService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
    this.title = this.route.snapshot.paramMap.get('myBook');
    this.getBook();
    this.checkUserRentals();
  }

  title: string;
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
    this.userService.checkUserRentals(this.user.username, this.title).subscribe((resp: string[]) => {
      console.log(resp);
      if (resp.length == 0) {
        this.rentingAvailable = true;
      } else {
        this.messages = resp;
        this.rentingAvailable = false;
      }
    })
  }

  getBook() {
    this.bookService.getBook(this.title).subscribe((book: Book) => {
      this.book = book;
      this.isAvailable = book.available > 0;
      this.noComments = book.comments == null || book.comments.length == 0;
      this.getBookImage();
      this.calculateRating();
    })
  }

  getBookImage() {
    this.bookService.getBookImage(this.book.title).subscribe((image: File) => {
      console.log(image);
      var reader = new FileReader();
      reader.addEventListener("load", () => {
        this.url = reader.result;
      }, false)
      reader.readAsDataURL(image);
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

  edit: boolean = false;
  newTitle: string;
  newAuthors: string[];
  newGenre: string[];
  newPublisher: string;
  newPublishYear: number;
  newLanguage: string;
  newAvailable: number;
  newImage: File;

  updateMessage: string;

  prepareForUpdate() {
    this.newTitle = this.book.title;
    this.newAuthors = this.book.authors;
    this.newGenre = this.book.genre;
    this.newPublisher = this.book.publisher;
    this.newPublishYear = this.book.publishYear;
    this.newLanguage = this.book.language;
    this.newAvailable = this.book.available;
    this.newImage = this.book.image;
  }

  updateBook() {
    if (this.book.image == this.newImage) {
      this.bookService.updateBookAndNotImage(this.title, this.newTitle, this.newAuthors, this.newGenre, this.newPublisher, this.newPublishYear, 
        this.newLanguage, this.newAvailable).subscribe(resp => {
          if (resp['message'] != 'ok') {
            this.updateMessage = 'Neuspesno azuriranje knjige!';
          } else {
            this.updateMessage = 'Knjiga azurirana!';
          }
      })
    } else {
      this.bookService.updateBookAndImage(this.title, this.newTitle, this.newAuthors, this.newGenre, this.newPublisher, this.newPublishYear, 
        this.newLanguage, this.newAvailable, this.newImage).subscribe(resp => {
          if (resp['message'] != 'ok') {
            this.updateMessage = 'Neuspesno azuriranje knjige!';
          } else {
            this.updateMessage = 'Knjiga azurirana!';
          }
      })
    }
  }

  uploadImage(event) {
    const file = event.target.files[0];
    this.newImage = file;
  }
}
