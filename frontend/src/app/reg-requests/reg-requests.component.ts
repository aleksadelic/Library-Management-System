import { Component, OnInit } from '@angular/core';
import { RegistrationRequest } from '../models/registrationRequest';
import { RequestImage } from '../models/requestImage';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reg-requests',
  templateUrl: './reg-requests.component.html',
  styleUrls: ['./reg-requests.component.css']
})
export class RegRequestsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllRegistrationRequests();
  }

  requests: RegistrationRequest[] = [];

  getAllRegistrationRequests() {
    this.userService.getAllRegistrationRequests().subscribe((requests: RegistrationRequest[]) => {
      this.requests = requests;
      this.getRequestImages();
    })
  }

  requestImages: RequestImage[] = [];
  getRequestImages() {
    for (var i = 0; i < this.requests.length; i++) {
      let request = this.requests[i];
      this.userService.getRequestImage(request.username).subscribe((image: File) => {
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          var res = reader.result;
          let requestImage = new RequestImage(request, res);
          this.requestImages.push(requestImage);
        }, false)
        
        reader.readAsDataURL(image);
      })
    }
  }

}
