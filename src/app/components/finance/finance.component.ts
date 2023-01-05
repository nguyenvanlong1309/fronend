import { Observable, of } from 'rxjs';
import { CurrencyPipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { ColDef } from 'ag-grid-community';

import { COLUMN_STT } from 'src/app/base/constant';
import { DonateTop } from 'src/app/models/donate.model';
import { Project } from 'src/app/models/project.model';
import { DonateService } from 'src/app/services/donate.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class FinanceComponent implements OnInit {

  public donate$: Observable<DonateTop[]> = of([]);
  public project$: Observable<Project[]>;
  public project: Project;
  public columnDefs: ColDef[] = [
    COLUMN_STT,
    {
      headerName: 'TÊN NGƯỜI TÀI TRỢ',
      headerTooltip: 'TÊN NGƯỜI TÀI TRỢ',

      cellStyle: {
          'top': '4px'
      },
      field: 'publicName',
      tooltipField: 'publicName',
    },
    {
      headerName: 'TÊN DỰ ÁN',
      headerTooltip: 'TÊN DỰ ÁN',

      cellStyle: {
          'top': '4px'
      },
      field: 'title',
      tooltipField: 'title',
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
  ) { }

  ngOnInit(): void {
    this.donate$ = this.donateService.findListDonate();
  }

  public exportExcel(): void {
    this.donateService.exportFile(formatDate(new Date(), 'dd_MM_yyyy', 'en_US'))
      .subscribe();
  }
}
