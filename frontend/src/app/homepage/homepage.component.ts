import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getTop3Books();
  }

  top3Books: Book[] = [];

  getTop3Books() {
    this.bookService.getTop3Books().subscribe((books: Book[]) => {
      this.top3Books = books;
      this.getBooksImages();
    })
  }

  bookUrls: any[] = [];
  getBooksImages() {
    for (var i = 0; i < this.top3Books.length; i++) {
      this.bookService.getBookImage(this.top3Books[i].title).subscribe((image: File) => {
        console.log(image);
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          this.bookUrls.push(reader.result);
        }, false)
        reader.readAsDataURL(image);
      })
    }
  }
}
