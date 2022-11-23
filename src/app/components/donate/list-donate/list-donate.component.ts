import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { COLUMN_STT } from 'src/app/base/constant';
import { DonateTop } from 'src/app/models/donate.model';

@Component({
  selector: 'app-list-donate',
  templateUrl: './list-donate.component.html',
  styleUrls: ['./list-donate.component.css'],
})
export class ListDonateComponent implements OnInit {

  @Input() 
  public donate: DonateTop[] = [];

  @Input()
  public noShowDate: boolean = false;

  public columnDefs: ColDef[] = [
    COLUMN_STT,
    {
      headerName: 'TÊN',
      headerTooltip: 'TÊN',

      cellStyle: {
        top: '4px',
      },
      field: 'publicName',
      tooltipField: 'publicName',
    },
    {
      headerName: 'NGÀY TÀI TRỢ',
      headerTooltip: 'NGÀY TÀI TRỢ',

      cellStyle: {
        top: '4px',
      },
      field: 'createdDate',
    },
    {
      headerName: 'SỐ TIỀN',
      headerTooltip: 'SỐ TIỀN',

      cellStyle: {
        top: '4px',
      },
      valueGetter: ({ data }) => {
        return this.currencyPipe.transform(data.total || 0, 'VND');
      },
    },

    {
      headerName: 'SỐ LẦN',
      headerTooltip: 'SỐ LẦN',

      cellStyle: {
        top: '4px',
      },
      field: 'count',
      tooltipField: 'count',
    },
  ];

  constructor(
    private currencyPipe: CurrencyPipe
  ) {}

  public ngOnInit(): void {
      if (this.noShowDate) {
        this.columnDefs.splice(1, 1);
      }
  }
}
