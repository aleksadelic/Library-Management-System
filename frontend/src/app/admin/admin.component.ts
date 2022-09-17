import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
  }

  user: User;

  logout() {
    localStorage.clear();
    this.router.navigate(['adminLogin']);
  }

  addUser() {

  }

  updateUser() {

  }

  deleteUser() {

  }

  addBook() {

  }

  updateBook() {

  }

  deleteBook() {
    
  }

}
