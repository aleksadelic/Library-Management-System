import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
  }

  user: User;
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;

  errorPassword1: string;
  errorPassword2: string;

  message: string;

  changePassword() {
    let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@!%&*?])[A-Za-z0-9#$@!%&*?]{8,12}$");
    if (this.newPassword1 == null || this.newPassword1 == "") {
      this.errorPassword1 = 'Obavezno polje';
      return;
    } else if (!passwordRegex.test(this.newPassword1)) {
      this.errorPassword1 = 'Lozinka sadrzi min 8, maks 12 karaktera, bar jedno veliko slovo, jedan broj i specijalni karakter i mora pocinjati slovom!';
      return;
    }
    if (this.newPassword2 == null || this.newPassword2 == "") {
      this.errorPassword2 = 'Obavezno polje';
      return;
    } else if (!passwordRegex.test(this.newPassword2)) {
      this.errorPassword2 = 'Lozinka sadrzi min 8, maks 12 karaktera, bar jedno veliko slovo, jedan broj i specijalni karakter i mora pocinjati slovom!';
      return;
    } 
    if (this.newPassword1 != this.newPassword2) {
      this.message = "Greska! Unesite novu lozinku ponovo!"
      return;
    }
    this.userService.changePassword(this.user.username, this.oldPassword, this.newPassword1).subscribe(resp => {
      if (resp["message"] == "ok") {
        alert("Uspesno promenjena lozinka!");
        localStorage.clear();
        this.router.navigate(['']);
      } else {
        this.message = "Greska! Netacna lozinka!"
      }
    })
  }

}
