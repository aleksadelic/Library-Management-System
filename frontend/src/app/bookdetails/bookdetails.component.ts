import { Component, Input, OnInit } from '@angular/core';
import { BookImage } from '../models/bookImage';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //console.log(this.myBook);
  }

  @Input() myBook: BookImage;

}
