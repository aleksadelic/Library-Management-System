import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BookReqImage } from '../models/bookReqImage';

@Component({
  selector: 'app-book-req-details',
  templateUrl: './book-req-details.component.html',
  styleUrls: ['./book-req-details.component.css']
})
export class BookReqDetailsComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  @Input() requestImage: BookReqImage;

  message: string;

  acceptRequest() {
    this.bookService.acceptBookRequest(this.requestImage.request.title).subscribe(resp => {
      if (resp['message'] != 'ok') {
        console.log('Greska!');
      } else {
        location.reload();
      }
    })
  }

  rejectRequest() {
    this.bookService.rejectBookRequest(this.requestImage.request.title).subscribe(resp => {
      if (resp['message'] != 'ok') {
        console.log('Greska!');
      } else {
        location.reload();
      }
    })
  }

}
