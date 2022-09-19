import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookImage } from '../models/bookImage';
import { RentalImage } from '../models/rentalImage';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-rented-book-card',
  templateUrl: './rented-book-card.component.html',
  styleUrls: ['./rented-book-card.component.css']
})
export class RentedBookCardComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
  }

  @Input() rentalImage: RentalImage;
  user: User;

  message: string;

  seeBook() {
    this.router.navigate(['/book', {myBookId: JSON.stringify(this.rentalImage.rental.book.id)}]);
  }

  returnBook() {
    this.bookService.returnBook(this.user.username, this.rentalImage.rental.book.id).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Knjiga uspesno vracena';
        location.reload();
      } else {
        this.message = 'Greska';
      }
    })
  }

  extendDeadline() {
    this.userService.extendDeadline(this.user.username, this.rentalImage.rental.book.id).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Rok za vracanje produzen';
        location.reload();
      } else {
        this.message = 'Greska';
      }
    })
  }

}
