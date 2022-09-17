import { Component, Input, OnInit } from '@angular/core';
import { RegistrationRequest } from '../models/registrationRequest';
import { RequestImage } from '../models/requestImage';
import { UserService } from '../user.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.request = this.requestImage.request;
    this.image = this.requestImage.image;
  }

  @Input() requestImage: RequestImage;
  request: RegistrationRequest;
  image;
  message: string;

  acceptRequest() {
    this.userService.acceptRequst(this.request.username).subscribe(resp => {
      if (resp['message'] != 'ok') {
        console.log('Greska!');
      } else {
        location.reload();
      }
    })
  }

  rejectRequest() {
    this.userService.rejectRequest(this.request.username).subscribe(resp => {
      if (resp['message'] != 'ok') {
        console.log('Greska!');
      } else {
        location.reload();
      }
    })
  }

}
