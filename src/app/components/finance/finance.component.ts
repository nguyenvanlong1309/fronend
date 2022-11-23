import { Utils } from './../../base/utils';
import { Observable, of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { COLUMN_STT } from 'src/app/base/constant';
import { DonateTop } from 'src/app/models/donate.model';
import { Project } from 'src/app/models/project.model';
import { DonateService } from 'src/app/services/donate.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  public donate$: Observable<DonateTop[]> = of([]);
  public project$: Observable<Project[]>;
  public project: Project;
  public columnDefs: ColDef[] = [
    COLUMN_STT,
    {
      headerName: 'TÊN',
      headerTooltip: 'TÊN',

      cellStyle: {
          'top': '4px'
      },
      field: 'publicName',
      tooltipField: 'publicName',
    },
    {
      headerName: 'NGÀY TÀI TRỢ',
      headerTooltip: 'NGÀY TÀI TRỢ',

      cellStyle: {
          'top': '4px'
      },
      field: 'createdDate',
    },
    {
      headerName: 'SỐ TIỀN',
      headerTooltip: 'SỐ TIỀN',

      cellStyle: {
          'top': '4px'
      },
      valueGetter: ({data}) => {
          return this.currencyPipe.transform(data.total || 0, 'VND')
      }
    },

    {
      headerName: 'SỐ LẦN',
      headerTooltip: 'SỐ LẦN',

      cellStyle: {
          'top': '4px'
      },
      field: 'count',
      tooltipField: 'count'
    }
  ]

  constructor(
    private currencyPipe: CurrencyPipe,
    private donateService: DonateService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.project$ = this.projectService.findAll();
  }

  public loadDonate(project: Project): void {
    this.project = project;
    this.donate$ = this.donateService.findListDonate(project.id);
  }

  public exportExcel(): void {
    this.donateService.exportFile(this.project.id, Utils.toLowerCaseNonAccentVietnamese(this.project.title).replace(/\s/g, '_'))
      .subscribe();    
  }
}