import { Component, OnInit } from '@angular/core';
import { Deadline } from '../models/deadline';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getDeadline();
  }

  deadline: number;
  extension: number;
  message: string;
  edit: boolean = false;

  updateDeadline() {
    this.userService.updateDeadline(this.deadline, this.extension).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.message = 'Rok za vracanje knjige azuriran';
        location.reload();
      } else {
        this.message = resp['message'];
      }
    })
  }

  getDeadline() {
    this.userService.getDeadline().subscribe((deadline: Deadline) => {
      this.deadline = deadline.deadline; 
      this.extension = deadline.extension;
    })
  }

}
