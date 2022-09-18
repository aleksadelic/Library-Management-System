import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BookReqImage } from '../models/bookReqImage';
import { BookRequest } from '../models/bookRequest';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.css']
})
export class BookRequestsComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllRequests();
  }

  requests: BookRequest[] = [];

  getAllRequests() {
    this.bookService.getAllBookRequests().subscribe((requests: BookRequest[]) => {
      this.requests = requests;
      this.getRequestImages();
    })
  }

  requestImages: BookReqImage[] = [];
  getRequestImages() {
    for (var i = 0; i < this.requests.length; i++) {
      let request = this.requests[i];
      this.bookService.getRequestImage(request.title).subscribe((image: File) => {
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          var res = reader.result;
          let requestImage = new BookReqImage(request, res);
          this.requestImages.push(requestImage);
        }, false)
        
        reader.readAsDataURL(image);
      })
    }
  }

}
