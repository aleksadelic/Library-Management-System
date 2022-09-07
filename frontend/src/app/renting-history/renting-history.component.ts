import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { RentalRecord } from '../models/rentalRecord';
import { RentalRecordImage } from '../models/rentalRecordImage';
import { User } from '../models/user';
import { UserService } from '../user.service';
//import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-renting-history',
  templateUrl: './renting-history.component.html',
  styleUrls: ['./renting-history.component.css']
})
export class RentingHistoryComponent implements OnInit {

  constructor(private userService: UserService, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
    this.getRentingHistory();
  }

  user: User;
  rentalRecords: RentalRecord[] = [];
  rentalRecordsImages: RentalRecordImage[] = [];

  getRentingHistory() {
    this.userService.getRentingHistory(this.user.username).subscribe((rentalRecords: RentalRecord[]) => {
      this.rentalRecords = rentalRecords;
      this.rentalRecords.sort((record1, record2) => {
        if (record1.returnDate > record2.returnDate) {
          return -1;
        } else if (record1.returnDate == record2.returnDate) {
          return 0
        } else return 1;
      })
      this.getBooksImages();
    })
  }

  getBooksImages() {
    for (var i = 0; i < this.rentalRecords.length; i++) {
      let rentalRecord = this.rentalRecords[i];
      console.log(rentalRecord);
      this.bookService.getBookImage(rentalRecord.title).subscribe((image: Blob) => {
        console.log(image);
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          var res = reader.result;
          let rentalRecordImage = new RentalRecordImage(rentalRecord, res);
          this.rentalRecordsImages.push(rentalRecordImage);
        }, false)
        reader.readAsDataURL(image);
      })
    }
  }

  seeBook(rental) {
    var title = rental.rentalRecord.title;
    this.router.navigate(['/book', {myBook: title}]);
  }

  titleSwitch: number = 0;
  authorSwitch: number = 0;
  rentalSwitch: number = 0;
  returnSwitch: number = 0;

  sortByTitle() {
    if (this.titleSwitch == 0) 
      this.titleSwitch = 1;
    else if (this.titleSwitch == 1)
      this.titleSwitch = 2;
    else this.titleSwitch = 1;
    this.authorSwitch = 0;
    this.rentalSwitch = 0;
    this.returnSwitch = 0;
    this.rentalRecordsImages.sort((record1, record2) => {
      if (record1.rentalRecord.title < record2.rentalRecord.title) {
        if (this.titleSwitch == 1) 
          return -1;
        else return 1;
      } else if (record1.rentalRecord.title == record2.rentalRecord.title) {
        return 0;
      } else {
        if (this.titleSwitch == 1) 
          return 1;
        else return -1;
      }
    })
  }

  sortByAuthor() {
    if (this.authorSwitch == 0) 
      this.authorSwitch = 1;
    else if (this.authorSwitch == 1)
      this.authorSwitch = 2;
    else this.authorSwitch = 1;
    this.titleSwitch = 0;
    this.rentalSwitch = 0;
    this.returnSwitch = 0;
    this.rentalRecordsImages.sort((record1, record2) => {
      if (record1.rentalRecord.authors[0] < record2.rentalRecord.authors[0]) {
        if (this.authorSwitch == 1) 
          return -1;
        else return 1;
      } else if (record1.rentalRecord.authors[0] == record2.rentalRecord.authors[0]) {
        return 0;
      } else {
        if (this.authorSwitch == 1) 
          return 1;
        else return -1;
      }
    })
  }

  sortByRentalDate() {
    if (this.rentalSwitch == 0) 
      this.rentalSwitch = 1;
    else if (this.rentalSwitch == 1)
      this.rentalSwitch = 2;
    else this.rentalSwitch = 1;
    this.authorSwitch = 0;
    this.titleSwitch = 0;
    this.returnSwitch = 0;
    this.rentalRecordsImages.sort((record1, record2) => {
      if (record1.rentalRecord.rentalDate > record2.rentalRecord.rentalDate) {
        if (this.rentalSwitch == 1) 
          return -1;
        else return 1;
      } else if (record1.rentalRecord.rentalDate == record2.rentalRecord.rentalDate) {
        return 0;
      } else {
        if (this.rentalSwitch == 1) 
          return 1;
        else return -1;
      }
    })
  }

  sortByReturnDate() {
    if (this.returnSwitch == 0) 
      this.returnSwitch = 1;
    else if (this.returnSwitch == 1)
      this.returnSwitch = 2;
    else this.returnSwitch = 1;
    this.authorSwitch = 0;
    this.titleSwitch = 0;
    this.rentalSwitch = 0;
    this.rentalRecordsImages.sort((record1, record2) => {
      if (record1.rentalRecord.returnDate > record2.rentalRecord.returnDate) {
        if (this.returnSwitch == 1) 
          return -1;
        else return 1;
      } else if (record1.rentalRecord.returnDate == record2.rentalRecord.returnDate) {
        return 0;
      } else {
        if (this.returnSwitch == 1) 
          return 1;
        else return -1;
      }
    })
  }

}
