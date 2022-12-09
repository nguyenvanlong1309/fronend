import { PROJECT_STATUS } from './../../../base/constant';
import { Region } from './../../../models/region.model';
import { Statistic } from './../../../models/statistic.model';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Chart } from 'chart.js/auto';
import { DonateService } from 'src/app/services/donate.service';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit, OnDestroy {

  private static COLOR_CHAR = ['rgb(76,163,211)', 'rgb(255,187,63)', 'rgb(232,87,87)'];
  private unsubscribe$: Subject<void> = new Subject();

  public donateChart: any;
  public projectByStatusChart: any;
  public projectInRegionChart: any;
  public yearList: Array<number>;
  public year: number;
  
  constructor(
    private donateService: DonateService,
    private regionService: RegionService,
  ) {}
  
  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.yearList = Array.from({length: 11}, (v, index) => this.year - index);
    this.ngOnInitDonateChart();
    this.ngOnInitProjectRegionChart();
    this.ngOnInitProjectStatusChart();
    this.onChangeYear();
  }

  ngOnInitDonateChart(): void {
    this.donateChart = new Chart("DonateChart", {
      type: 'line',
      data: {
        labels: ['T1', 'T2', 'T3','T4', 'T5', 'T6', 'T7','T8','T9','T10','T11','T12' ],
        datasets: []
      },
      options: {
        aspectRatio: 2.5,
      }
    });
  }

  ngOnInitProjectRegionChart(): void {
    this.projectInRegionChart = new Chart("ProjectInRegionChart", {
      type: 'pie',
      data: {
        labels: [],
	      datasets: []
      },
      options: {
        aspectRatio:2.5,
      }
    });
  }

  ngOnInitProjectStatusChart(): void {
    this.projectByStatusChart = new Chart("ProjectByStatusChart", {
      type: 'pie',
      data: {
        labels: PROJECT_STATUS.map(s => s.name),
	      datasets: []
      },
      options: {
        aspectRatio:2.5,
      }
    });
  }

  onChangeYear(): void {
    this.hanleDataLineChart();
    this.handleDataPieChart();
  }

  handleDataPieChart(){
    this.regionService.findProjectByYear(this.year)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.handleDataProjectInRegionChart(res);
        this.handleDataProjectStatusChart(res);
      })
  }

  handleDataProjectInRegionChart(res: Region[]): void {
    const { data } = this.projectInRegionChart;
    const obj = res.reduce((d, cur, index) => {
      d.label.push(cur.name);
      d.data.push(cur.projects.length);
      d.bg.push(DashboardComponent.COLOR_CHAR[index] || 'black');
      return d;
    }, {label: [], data: [], bg: []} as {label: string[], data: number[], bg: string[]});
    data.labels = obj.label;
    data.datasets = [
      {
        data: obj.data,
        background: obj.bg,
        hoverOffset: 4
      }
    ];
    this.projectInRegionChart.update();
  }

  handleDataProjectStatusChart(res: Region[]): void {
    const projects = res.flatMap(r => r.projects);
    const dataInitialzeProjectStatusChard = PROJECT_STATUS.reduce((data, cur, index) => {
      if (cur.id === 3) return data;
      data.data.push(0);
      data.background.push(DashboardComponent.COLOR_CHAR[index] || 'black');
      return data;
    }, {data: [], background: []} as {data: number[], background: string[]})
    projects.forEach(p => {
      if (p.status != 3)
        dataInitialzeProjectStatusChard.data[p.status] = dataInitialzeProjectStatusChard.data[p.status] + 1;
    });
    this.projectByStatusChart.data.datasets = [dataInitialzeProjectStatusChard];
    this.projectByStatusChart.update();
  }

  hanleDataLineChart(){
    this.donateService.statisitcDonate(this.year)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.donateChart.data.datasets = res.map((d, index) => {
          const data = [...Array(12)].map((v, index) => {
            const statistic = d.data.find(statistic => statistic.label == `${index + 1}`) as Statistic;
            return statistic?.value || 0;
          })
          return {
            label: d.regionName,
            data: data,
            background: DashboardComponent.COLOR_CHAR[index] || 'black',
          }
        });
        this.donateChart.update();
      })
  }
 
  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }
}
