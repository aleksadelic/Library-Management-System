import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('logged in'));
      if (this.user) {
        this.getUserImage();
      }
  }

  user: User = null;
  userImageUrl;

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  getUserImage() {
    this.userService.getUserImage(this.user.username).subscribe((image: File) => {
      console.log(image);
      var reader = new FileReader();
      reader.addEventListener("load", () => {
        this.userImageUrl = reader.result;
      }, false)
      reader.readAsDataURL(image);
    })
  }

}
