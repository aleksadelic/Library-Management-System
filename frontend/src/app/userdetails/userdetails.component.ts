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
    this.deadline = this.user.deadline;
  }

  @Input() userImage: UserImage;
  user: User;
  image;
  message: String;
  deadline: number;
  edit: boolean = false;

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

  promoteUser() {
    this.userService.promoteUser(this.user.username).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Korisniku podignute privilegije';
        location.reload();
      } else {
        this.message = resp['message'];
      }
    })
  }

  demoteUser() {
    this.userService.demoteUser(this.user.username).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Korisniku spustene privilegije';
        location.reload();
      } else {
        this.message = resp['message'];
      }
    })
  }

  blockUser() {
    this.userService.blockUser(this.user.username).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Korisnik blokiran';
        location.reload();
      } else {
        this.message = resp['message'];
      }
    })
  }

  unblockUser() {
    this.userService.unblockUser(this.user.username).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Korisnik odblokiran';
        location.reload();
      } else {
        this.message = resp['message'];
      }
    })
  }

  updateDeadline() {
    this.userService.updateDeadline(this.user.username, this.deadline).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Korisnik odblokiran';
        location.reload();
      } else {
        this.message = resp['message'];
      }
    })
  }

}
