import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.route.snapshot.paramMap.get('userToUpdate'));
    this.username = this.user.username;
    this.password1 = this.user.password;
    this.password2 = this.user.password;
    this.firstname = this.user.firstname;
    this.lastname = this.user.lastname;
    this.address = this.user.address;
    this.tel = this.user.tel;
    this.email = this.user.email;
    this.type = this.user.type;
    this.image = this.user.image;
  }

  user: User;

  username: string;
  password1: string;
  password2: string;
  firstname: string;
  lastname: string;
  address: string;
  tel: string;
  email: string;
  type: number;
  image: File;

  message: string;

  updateUser() {
    if (this.password1 != this.password2) {
      this.message = 'Unete lozinke se ne podudaraju!';
      return;
    }
    if (this.image != null && this.image != this.user.image) {
      this.userService.updateUserAndImage(this.user.username, this.username, this.password1, this.firstname, this.lastname, this.address, this.tel, this.email, this.image).subscribe(respObj => {
        if (respObj['message'] == 'ok') {
          this.message = 'Korisnik uspesno azuriran!';
        } else {
          this.message = respObj['message'];
        }
        console.log(respObj);
     });
    } else {
      this.userService.updateUserAndNotImage(this.user.username, this.username, this.password1, this.firstname, this.lastname, this.address, this.tel, this.email).subscribe(respObj => {
        if (respObj['message'] == 'ok') {
          this.message = 'Korisnik uspesno azuriran!';
        } else {
          this.message = respObj['message'];
        }
        console.log(respObj);
     });
    }
    
  }

  uploadImage(event) {
    const file = event.target.files[0];
    this.image = file;
  }
}
