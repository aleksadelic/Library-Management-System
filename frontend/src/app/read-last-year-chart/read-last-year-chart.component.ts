import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { User } from '../models/user';
import { UserService } from '../user.service';
Chart.register(...registerables);

@Component({
  selector: 'app-read-last-year-chart',
  templateUrl: './read-last-year-chart.component.html',
  styleUrls: ['./read-last-year-chart.component.css']
})
export class ReadLastYearChartComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.rotateMonthArray();
    this.user = JSON.parse(localStorage.getItem('logged in'));
    this.getUserStatistics();
  }

  user: User;
  data: number[];
  monthArray: string[] = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];

  getUserStatistics() {
    this.userService.getNumberOfReadBooksInLastYear(this.user.username).subscribe((data: number[]) => {
      this.data = data;
      console.log(data);
      const myChart = new Chart("myChart1", {
        type: 'bar',
        data: {
          labels: this.monthArray,
          datasets: [{
            label: 'Broj knjiga procitanih u poslednjih 12 meseci',
            data: this.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
  }

  rotateMonthArray() {
    let month = new Date().getMonth();
    let temp: string[] = [];
    for (let i = month + 1; i < this.monthArray.length; i++) {
      temp.push(this.monthArray[i]);
    }
    for (let i = this.monthArray.length - 1; i >= 11 - month; i--) {
      this.monthArray[i] = this.monthArray[i - 3];
    }
    for (let i = 0; i < temp.length; i++) {
      this.monthArray[i] = temp[i];
    }
  }

}
