import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
    this.getBookOfTheDay();
  }

  user: User;
  bookOfTheDay: Book;

  getBookOfTheDay() {
    this.bookService.getBookOfTheDay().subscribe((book: Book) => {
      this.bookOfTheDay = book;
      this.getBookImage();
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  bookImageUrl;
  getBookImage() {
    this.bookService.getBookImage(this.bookOfTheDay.title).subscribe((image: File) => {
      console.log(image);
      var reader = new FileReader();
      reader.addEventListener("load", () => {
        this.bookImageUrl = reader.result;
      }, false)
      reader.readAsDataURL(image);
    })
  }
}
