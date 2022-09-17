import { Component, OnInit } from '@angular/core';
import { Rental } from '../models/rental';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  username: string;
  password1: string;
  password2: string;
  firstname: string;
  lastname: string;
  address: string;
  tel: string;
  email: string;
  type: number;
  rentals: Rental[] = [];
  image: File;

  message: string;

  addUser() {
    if (this.password1 != this.password2) {
      this.message = 'Unete lozinke se ne podudaraju!';
      return;
    }
    this.userService.register(this.username, this.password1, this.firstname, this.lastname, this.address, this.tel, this.email, this.image).subscribe(respObj => {
       if (respObj['message'] == 'ok') {
         this.message = 'User added';
       } else {
         this.message = respObj['message'];
       }
       console.log(respObj);
    });
  }

  uploadImage(event) {
    const file = event.target.files[0];
    this.image = file;
  }

}
