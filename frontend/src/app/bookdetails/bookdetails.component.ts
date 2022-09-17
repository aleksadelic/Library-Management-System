import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookImage } from '../models/bookImage';
import { User } from '../models/user';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
  }

  @Input() myBook: BookImage;

  seeBook() {
    this.router.navigate(['/book', {myBook: this.myBook.book.title}]);
  }

  message: string;
  user: User;

  deleteBook() {
    this.bookService.deleteBook(this.myBook.book.title).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Knjiga izbrisana';
        location.reload();
      } else {
        this.message = resp['message'];
      }
    })
  }

}
