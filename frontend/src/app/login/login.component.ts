import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  message: string;

  login() {
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if(user != null) {
        localStorage.setItem('logged in', JSON.stringify(user));
        if(user.type == 0) {
          this.router.navigate(['user']);
        } else if(user.type == 1) {
          this.router.navigate(['moderator']);
        } else {
          this.message = 'Nepoznat tip korisnika!';
        }
      } else {
        this.message = 'Greska pri logovanju!'
      }
    })
  }

}
