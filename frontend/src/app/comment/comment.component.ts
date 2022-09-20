import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.date = new Date(this.comment.datetime);
    /*this.dateString = this.date.getDate() + "." + (this.date.getMonth() + 1) + "." + this.date.getFullYear() + 
      " " + this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds();*/
    this.dateString = this.date.toLocaleString();
    this.starsArr = new Array(this.comment.rating);
  }

  date: Date;
  dateString: string;
  starsArr: any[];

  @Input() comment: Comment;

}
