import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { BookImage } from '../models/bookImage';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private bookService: BookService) { }

  ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('logged in'));
      if (this.user) {
        this.getUserImage();
      }
  }

  user: User = null;
  userImageUrl;
  books: Book[] = [];

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  getUserImage() {
    this.userService.getUserImage(this.user.username).subscribe((image: File) => {
      console.log(image);
      var reader = new FileReader();
      reader.addEventListener("load", () => {
        this.userImageUrl = reader.result;
      }, false)
      reader.readAsDataURL(image);
    })
  }

  searchParam: string;

  search() {
    this.bookImages = [];
    return this.bookService.searchBooks(this.searchParam).subscribe((books: Book[]) => {
      this.books = books;
      this.getSearchImages();
    })
  }

  bookImages: BookImage[] = [];
  getSearchImages() {
    for (var i = 0; i < this.books.length; i++) {
      let book = this.books[i];
      console.log(book);
      this.bookService.getBookImage(this.books[i].title).subscribe((image: Blob) => {
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

  setMyBook(bookImage: BookImage) {
    localStorage.setItem('myBook', JSON.stringify(bookImage));
  }

}
