import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserImage } from '../models/userImage';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userImage.user;
    this.image = this.userImage.image;
  }

  @Input() userImage: UserImage;
  user: User;
  image;
  message: String;

  updateUser() {
    this.router.navigate(['updateUser', {'userToUpdate': JSON.stringify(this.user)}])
  }

  deleteUser() {
    this.userService.deleteUser(this.user.username).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Korisnik izbrisan';
        location.reload();
      } else {
        this.message = resp['message'];
      }
    })
  }

}
