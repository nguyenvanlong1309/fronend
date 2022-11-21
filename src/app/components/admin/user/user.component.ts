import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { COLUMN_STT } from 'src/app/base/constant';
import { UserService } from 'src/app/services/user.service';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { UserResponseModel } from 'src/app/models/user.model';
import { UserActionComponent } from './action/user-action.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

	public columnDefs: ColDef[];
	public user$: Observable<UserResponseModel[]>;

	constructor(
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.ngOnLoadUser();
		this.ngOnInitColumn();
	}

	ngOnLoadUser(): void {
		this.user$ = this.userService.findAllUser();
	}

	ngOnInitColumn(): void {
		this.columnDefs = [
			COLUMN_STT,
			{
				headerName: 'TÊN NGƯỜI DÙNG',
				headerTooltip: 'TÊN NGƯỜI DÙNG',
				minWidth: 180,

				cellStyle: {
					'top': '4px',
				},

				field: 'fullName',
				tooltipField: 'fullName'
			},
			{
				headerName: 'TÊN TÀI KHOẢN',
				headerTooltip: 'TÊN TÀI KHOẢN',
				minWidth: 150,

				cellStyle: {
					'top': '4px',
				},

				field: 'username',
				tooltipField: 'username'
			},
			
			{
				headerName: 'SỐ ĐIỆN THOẠI',
				headerTooltip: 'SỐ ĐIỆN THOẠI',
				minWidth: 150,
				maxWidth: 150,

				cellStyle: {
					'top': '4px',
				},

				field: 'phone',
				tooltipField: 'phone'
			},
			{
				headerName: 'EMAIL',
				headerTooltip: 'EMAIL',
				minWidth: 120,

				cellStyle: {
					'top': '4px',
				},

				field: 'email',
				tooltipField: 'email'
			},
			{
				headerName: 'ĐỊA CHỈ',
				headerTooltip: 'ĐỊA CHỈ',
				minWidth: 100,

				cellStyle: {
					'top': '4px',
				},

				field: 'address',
				tooltipField: 'address'
			},
			{
				headerName: 'QUYỀN',
				headerTooltip: 'QUYỀN',
				minWidth: 100,

				cellStyle: {
					'top': '4px',
				},

				field: 'role',
				tooltipField: 'role'
			},
			{
				headerName: 'TRẠNG THÁI',
				headerTooltip: 'TRẠNG THÁI',
				minWidth: 120,
				maxWidth: 120,

				cellStyle: ({data}) => ({
					'top': '4px',
					'color': data.status == 0 ? '#e85757' : '#5ad1e8'
				}),
				valueGetter: ({data}) => {
					return data.status == 0 ? 'Khóa' : 'Hoạt động'
				}

			},
			{
				headerName: 'LỊCH SỬ TÀI TRỢ',
				headerTooltip: 'LỊCH SỬ TÀI TRỢ',
				minWidth: 155,
				maxWidth: 155,
				type: 'DONATE',
				pinned: 'right',
				cellStyle: {
					'display': 'flex',
					'align-items': 'center',
				},
				cellRenderer: ShowDetailComponent
			},
			{
				headerName: 'LỊCH SỬ ĐĂNG BÀI',
				headerTooltip: 'LỊCH SỬ ĐĂNG BÀI',
				minWidth: 155,
				maxWidth: 155,
				type: 'PROJECT',
				pinned: 'right',
				cellStyle: {
					'display': 'flex',
					'align-items': 'center',
				},
				cellRenderer: ShowDetailComponent
			},
			{
				headerName: 'THAO TÁC',
				headerTooltip: 'THAO TÁC',
				minWidth: 110,
				maxWidth: 110,
				pinned: 'right',
				cellStyle: {
					'display': 'flex',
					'justify-content': 'center',
					'align-items': 'center',
					'overflow': 'unset',
				},
				cellRenderer: UserActionComponent
			},
		]
	}
}