import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
  }

  changePassword() {
    this.router.navigate(['changePassword']);
  }

  user: User;

  updateProfile() {
    this.router.navigate(['updateProfile', {'userToUpdate': JSON.stringify(this.user)}])
  }

}
