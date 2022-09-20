import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { BookImage } from '../models/bookImage';

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

  bookImages: BookImage[] = [];
  sliderObjects: any[] = [];

  getBooksImages() {
    for (var i = 0; i < this.top3Books.length; i++) {
      let book = this.top3Books[i];
      this.bookService.getBookImage(this.top3Books[i].id).subscribe((image: File) => {
        console.log(image);
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          var res = reader.result;
          let bookImage = new BookImage(book, res);
          this.bookImages.push(bookImage);
          this.sliderObjects.push({image: res, thumbImage: res, title: book.title});
        }, false)

        reader.readAsDataURL(image);
      })
    }
  }

}
