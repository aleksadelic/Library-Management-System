import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { BookImage } from '../models/bookImage';
import { Rental } from '../models/rental';
import { RentalImage } from '../models/rentalImage';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-rented-books',
  templateUrl: './rented-books.component.html',
  styleUrls: ['./rented-books.component.css']
})
export class RentedBooksComponent implements OnInit {

  constructor(private userService: UserService, private bookService: BookService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
    this.getMyRentals();
  }
  
  user: User;
  rentalsImages: RentalImage[] = [];
  rentals: Rental[];
  noRentedBooks : boolean = false;

  getMyRentals() {
    this.userService.getMyRentals(this.user.username).subscribe((rentals: Rental[]) => {
      console.log(rentals);
      this.rentals = rentals;
      if (this.rentals != null)
        this.getBooksImages();
      else
        this.noRentedBooks = true;
    })
  }

  getBooksImages() {
    for (var i = 0; i < this.rentals.length; i++) {
      let rental = this.rentals[i];
      console.log(rental);
      let book = rental.book;
      this.bookService.getBookImage(book.id).subscribe((image: Blob) => {
        console.log(image);
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          var res = reader.result;
          let rentalImage = new RentalImage(rental, res);
          this.rentalsImages.push(rentalImage);
        }, false)
        reader.readAsDataURL(image);
      })
    }
  }
}
