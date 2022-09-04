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

  message: string;

  changePassword() {
    if (this.newPassword1 != this.newPassword2) {
      this.message = "Greska! Unesite novu lozinku ponovo!"
      return;
    }
    this.userService.changePassword(this.user.username, this.oldPassword, this.newPassword1).subscribe(resp => {
      if (resp["message"] == "ok") {
        alert("Uspesno promenjena lozinka!");
        sessionStorage.clear();
        this.router.navigate(['']);
      } else {
        this.message = "Greska! Netacna lozinka!"
      }
    })
  }

}
