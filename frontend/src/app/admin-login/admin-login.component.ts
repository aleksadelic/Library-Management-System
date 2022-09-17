import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  message: string;

  login() {
    this.userService.adminLogin(this.username, this.password).subscribe((user: User) => {
      if (user != null) {
        localStorage.setItem('logged in', JSON.stringify(user));
        this.router.navigate(['admin']);
      } else {
        this.message = 'Greska pri logovanju!'
      }
    })
  }

}
