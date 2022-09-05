import { Component, Input, OnInit } from '@angular/core';
import { RentalImage } from '../models/rentalImage';

@Component({
  selector: 'app-rented-book-card',
  templateUrl: './rented-book-card.component.html',
  styleUrls: ['./rented-book-card.component.css']
})
export class RentedBookCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() rentalImage: RentalImage;

}
