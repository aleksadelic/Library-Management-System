import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService) { }

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
  image: File;

  message: string;
  errorRequired: string = "Obavezno polje!";

  register() {
    let error = this.validateForm();
    if (error) {
      this.message = 'Greska!';
      return;
    }
    if (this.password1 != this.password2) {
      this.message = 'Unete lozinke se ne podudaraju!';
      return;
    }
    this.userService.register(this.username, this.password1, this.firstname, this.lastname, this.address, this.tel, this.email, this.image).subscribe(respObj => {
       if (respObj['message'] == 'ok') {
         this.message = 'Dodat zahtev za registraciju!';
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

  errorUsername: string;
  errorPassword1: string;
  errorPassword2: string;
  errorFirstname: string;
  errorLastname: string;
  errorAddress: string;
  errorTel: string;
  errorEmail: string;
  errorType: number;

  validateForm() {
    let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@!%&*?])[A-Za-z0-9#$@!%&*?]{8,12}$");
    let error: boolean = false;
    if (this.username == null || this.username == "") {
      this.errorUsername = this.errorRequired;
      error = true;
    }
    if (this.password1 == null || this.password1 == "") {
      this.errorPassword1 = this.errorRequired;
    } else if (!passwordRegex.test(this.password1)) {
      console.log(this.password1);
      this.errorPassword1 = 'Lozinka sadrzi min 8, maks 12 karaktera, bar jedno veliko slovo, jedan broj i specijalni karakter i mora pocinjati slovom!';
      error = true;
    }
    if (this.password2 == null || this.password2 == "") {
      this.errorPassword2 = this.errorRequired;
    } else if (!passwordRegex.test(this.password2)) {
      this.errorPassword2 = 'Lozinka sadrzi min 8, maks 12 karaktera, bar jedno veliko slovo, jedan broj i specijalni karakter i mora pocinjati slovom!';
      error = true;
    } 
    if (this.firstname == null || this.firstname == "") {
      this.errorFirstname = this.errorRequired;
      error = true;
    }
    if (this.lastname == null || this.lastname == "") {
      this.errorLastname = this.errorRequired;
      error = true;
    }
    if (this.address == null || this.address == "") {
      this.errorAddress = this.errorRequired;
      error = true;
    }
    if (this.tel == null || this.tel == "") {
      this.errorTel = this.errorRequired;
      error = true;
    }
    if (this.email == null || this.email == "") {
      this.errorEmail = this.errorRequired;
      error = true;
    }
    return error;
  }

}
