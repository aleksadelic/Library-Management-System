import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookImage } from '../models/bookImage';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //console.log(this.myBook);
  }

  @Input() myBook: BookImage;

  seeBook() {
    this.router.navigate(['/book', {myBook: this.myBook.book.title}]);
  }

}
