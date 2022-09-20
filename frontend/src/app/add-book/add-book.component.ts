import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  title: string;
  authors: string[];
  genre: string[];
  publisher: string;
  publishYear: number;
  language: string;
  available: number;
  image: File;

  message: string;

  addBook() {
    let error = this.validateForm();
    if (error) {
      this.message = 'Greska!';
      return;
    }
    this.bookService.addBook(this.title, this.authors, this.genre, this.publisher, this.publishYear, this.language, this.available, this.image)
      .subscribe(resp => {
        if (resp['message'] == 'ok') {
          this.message = 'Book added';
        } else {
          this.message = resp['message'];
        }
      })
  }

  uploadImage(event) {
    const file = event.target.files[0];
    this.image = file;
  }

  errorTitle: string;
  errorAuthors: string;
  errorGenre: string;
  errorPublisher: string;
  errorPublishYear: string;
  errorLanguage: string;
  errorAvailable: string;

  validateForm() {
    let error: boolean = false;
    if (this.title == null || this.title == "") {
      this.errorTitle = 'Obavezno polje!';
      error = true;
    }
    if (this.authors == null || this.authors.length == 0) {
      this.errorAuthors = 'Obavezno polje!';
      error = true;
    }
    if (this.genre == null || this.genre.length == 0) {
      this.errorGenre = 'Obavezno polje!';
      error = true;
    }
    if (this.publisher == null || this.publisher == "") {
      this.errorPublisher = 'Obavezno polje!';
      error = true;
    }
    if (this.publishYear == null || this.publishYear == undefined) {
      this.errorPublishYear = 'Obavezno polje!';
      error = true;
    }
    if (this.language == null || this.language == "") {
      this.errorLanguage = 'Obavezno polje!';
      error = true;
    }
    if (this.available == null || this.available == undefined) {
      this.errorAvailable = 'Obavezno polje!';
      error = true;
    }
    return error;
  }

}
