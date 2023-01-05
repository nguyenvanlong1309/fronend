import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CurrencyPipe, formatDate } from '@angular/common';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

import { environment } from 'src/environments/environment';
import { COLUMN_STT } from 'src/app/base/constant';
import { Donate } from 'src/app/models/donate.model';
import { DonateService } from 'src/app/services/donate.service';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class DonateComponent implements OnInit {

	public columnDefs: ColDef[];
	public donate$: Observable<Donate[]>

	constructor(
		private donateService: DonateService,
		private currencyPipe: CurrencyPipe,
	) {}

	ngOnInit(): void {
		this.ngOnInitColumn();
		this.donate$ = this.donateService.findAll();
	}

	ngOnInitColumn(): void {
		this.columnDefs = [
			COLUMN_STT,
			{
				headerName: 'CHẾ ĐỘ',
				headerTooltip: 'CHẾ ĐỘ',
				minWidth: 100,
				maxWidth: 100,

				valueGetter: ({data}) => {
					return data.mode === 0 ? 'Công khai' : 'Ẩn danh'
				},
				cellStyle: {
                    'top': '30px'
                }
			},
			{
				headerName: 'TÊN NGƯỜI DÙNG',
				headerTooltip: 'TÊN NGƯỜI DÙNG',
				minWidth: 150,

				field: 'fullName',
				tooltipField: 'fullName',

				cellStyle: {
                    'top': '30px'
                }
			},
			{
				headerName: 'TÊN CÔNG BỐ',
				headerTooltip: 'TÊN CÔNG BỐ',
				minWidth: 150,

				field: 'publicName',
				tooltipField: 'publicName',

				cellStyle: {
                    'top': '30px'
                }
			},
			{
				headerName: 'NGÀY TÀI TRỢ',
				headerTooltip: 'NGÀY TÀI TRỢ',
				minWidth: 140,
				maxWidth: 140,

				field: 'createdDate',
				tooltipField: 'createdDate',
				valueFormatter: ({data}) => {
					return formatDate(data.createdDate, 'dd/MM/yyyy', 'en_US');
				},

				cellStyle: {
                    'top': '30px'
                }
			},
			{
				headerName: 'SỐ ĐIỆN THOẠI',
				headerTooltip: 'SỐ ĐIỆN THOẠI',
				minWidth: 140,
				maxWidth: 140,

				field: 'phone',
				tooltipField: 'phone',

				cellStyle: {
                    'top': '30px'
                }
			},
			{
				headerName: 'SỐ TIỀN',
				headerTooltip: 'SỐ TIỀN',
				minWidth: 150,

				field: 'money',
				tooltipField: 'money',
				valueFormatter: ({data}) => {
					return this.currencyPipe.transform(data.money || 0, 'VND');
				},

				cellStyle: {
                    'top': '30px'
                }
			},
			{
				headerName: 'CHƯƠNG TRÌNH TỪ THIỆN',
				headerTooltip: 'CHƯƠNG TÌNH TỪ THIỆN',
				minWidth: 220,

				field: 'title',
				tooltipField: 'title',

				cellStyle: {
                    'top': '30px'
                }
			},
			{
				headerName: 'LỜI NHẮN',
				headerTooltip: 'LỜI NHẮN',
				minWidth: 120,
				maxWidth: 120,

				cellRenderer: CommentComponent,
				cellStyle: {
					'display': 'flex',
					'align-items': 'center',
				}
			},
			{
				headerName: 'LOGO CÔNG TY',
				headerTooltip: 'LOGO CÔNG TY',
				minWidth: 150,
				maxWidth: 150,

				cellStyle: {
					'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center'
				},
				cellRenderer: ({data}) => {
					if (!data.image) return '';
					return `<img src="${environment.IMAGE_STORE_URL}${data.image}" class="w-100 h-100" />`
				}
			}
		]
	}
}
