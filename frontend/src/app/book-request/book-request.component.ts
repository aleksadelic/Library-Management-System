import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-request',
  templateUrl: './book-request.component.html',
  styleUrls: ['./book-request.component.css']
})
export class BookRequestComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  title: string;
  authors: string[];
  genre: string[];
  publisher: string;
  publishYear: number;
  language: string;
  image: File;

  message: string;

  addBook() {
    this.bookService.addBookRequest(this.title, this.authors, this.genre, this.publisher, this.publishYear, this.language, this.image)
      .subscribe(resp => {
        if (resp['message'] == 'ok') {
          this.message = 'Dodat zahtev za dodavanje knjige!';
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
