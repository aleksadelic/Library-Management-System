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
    this.getUserNotifications();
  }

  user: User;
  bookOfTheDay: Book;
  bookRating: string = "Nema recenzija";

  getBookOfTheDay() {
    this.bookService.getBookOfTheDay().subscribe((book: Book) => {
      this.bookOfTheDay = book;
      if (book.comments != null && book.comments.length > 0) {
        let rating = 0;
        for (var i = 0; i < book.comments.length; i++) {
          rating += book.comments[i].rating;
        }
        rating /= book.comments.length;
        this.bookRating = rating.toString();
      }
      this.getBookImage();
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  bookImageUrl;
  getBookImage() {
    this.bookService.getBookImage(this.bookOfTheDay.id).subscribe((image: File) => {
      console.log(image);
      var reader = new FileReader();
      reader.addEventListener("load", () => {
        this.bookImageUrl = reader.result;
      }, false)
      reader.readAsDataURL(image);
    })
  }

  notifications: string[] = [];

  getUserNotifications() {
    this.userService.getUserNotifications(this.user.username).subscribe((messages: string[]) => {
      this.notifications = messages;
    })
  }

}
