import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserImage } from '../models/userImage';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.user = JSON.parse(localStorage.getItem('logged in'));
  }

  users: User[] = [];
  user: User;

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.getUserImages();
    })
  }

  userImages: UserImage[] = [];
  getUserImages() {
    for (var i = 0; i < this.users.length; i++) {
      let user = this.users[i];
      this.userService.getUserImage(user.username).subscribe((image: File) => {
        var reader = new FileReader();
        reader.addEventListener("load", () => {
          var res = reader.result;
          let userImage = new UserImage(user, res);
          this.userImages.push(userImage);
        }, false)
        
        reader.readAsDataURL(image);
      })
    }
  }

  addUser() { 
    this.router.navigate(['addUser']);
  }
  
}
