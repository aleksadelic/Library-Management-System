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
  genre: string[] = [];
  publisher: string;
  publishYear: number;
  language: string;
  available: number;
  image: File;

  message: string;

  addBook() {
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

}
