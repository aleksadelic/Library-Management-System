import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { User } from '../models/user';
import { UserService } from '../user.service';
Chart.register(...registerables);

@Component({
  selector: 'app-read-by-genre-chart',
  templateUrl: './read-by-genre-chart.component.html',
  styleUrls: ['./read-by-genre-chart.component.css']
})
export class ReadByGenreChartComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged in'));
    this.getUserStatistics();
  }

  user: User;
  data: number[] = [];
  labels: string[] = [];

  getUserStatistics() {
    this.userService.getNumberOfReadBooksByGenre(this.user.username).subscribe(resp => {
      this.labels = resp['labels'];
      this.data = resp['data'];

      const myChart = new Chart("myChart2", {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Broj procitanih knjiga po zanru',
            data: this.data,
            backgroundColor: [
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

}
