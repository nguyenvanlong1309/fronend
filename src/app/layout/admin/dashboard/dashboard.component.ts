import { Component, importProvidersFrom, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit {
  constructor() {}
  public chart: any;
  public bar: any;
  public pie: any;

  ngOnInit(): void {
    this.lineChart();
    this.createChart();
    this.pieChart();

  }

  // Pie Chart
  pieChart(){
    this.pie = new Chart("pieChart", {
      type: 'pie',

      data: {
        labels: [
          'Miền Nam',
          'Miền Bắc',
          'Miền Trung'
        ],
	      datasets: [{
          label: '',
          data: [33, 22, 45],
          backgroundColor: [
            'rgb(232,87,87)',
            'rgb(76,163,211)',
            'rgb(255,187,63)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  // Line Chart
  lineChart(){
    this.chart = new Chart("MyChart", {
      type: 'line',

      data: {
        labels: ['T1', 'T2', 'T3','T4',
								 'T5', 'T6', 'T7','T8','T9','T10','T11','T12' ],
	       datasets: [
          {
            label: "Bắc",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576', '576', '360', '702', '576'],
            backgroundColor: 'blue',
          },
          {
            label: "Trung",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541', '300', '541', '300', '300'],
            backgroundColor: 'limegreen'
          },{
            label: "Nam",
            data: ['400', '500', '300', '200', '17',
									 '0.00', '360', '541', '300', '200', '300', '400'],
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  // Bar Chart
  createChart(){

    this.bar = new Chart("barChart", {
      type: 'bar',

      data: {
        labels: [''],
	       datasets: [
          {
            label: "Đang vận động",
            data: ['467'],
            backgroundColor: 'red'
          },
          {
            label: "Không thời hạn",
            data: ['542'],
            backgroundColor: 'limegreen'
          },{
            label: "Đã hoàn thành",
            data: ['342'],
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
}
