import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookImage } from '../models/bookImage';
import { RentalImage } from '../models/rentalImage';

@Component({
  selector: 'app-rented-book-card',
  templateUrl: './rented-book-card.component.html',
  styleUrls: ['./rented-book-card.component.css']
})
export class RentedBookCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @Input() rentalImage: RentalImage;

  seeBook() {
    var bookImage = new BookImage(this.rentalImage.rental.book, this.rentalImage.image);
    localStorage.setItem('myBook', JSON.stringify(bookImage));
    this.router.navigate(['/book']);
  }

}
