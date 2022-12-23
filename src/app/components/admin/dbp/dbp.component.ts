import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { DbpActionComponent } from './action/dbp-action.component';
import { CurrencyPipe, formatDate } from '@angular/common';
import { COLUMN_STT } from 'src/app/base/constant';
import { PostFormComponent } from '../../shared/post-form/post-form.component';
import { Utils } from 'src/app/base/utils';

@Component({
  selector: 'app-dbp',
  templateUrl: './dbp.component.html',
  styleUrls: ['./dbp.component.css']
})
export class DbpComponent implements OnInit {

  public columnDefs: ColDef[];
  public project$: Observable<Project[]>;
  public title: string;
  public onLoadData: () => void;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private projectService: ProjectService,
    private currencyPipe: CurrencyPipe,
  ) { }

  public ngOnInit(): void {

    const { url } = this.router;

    if (url == '/admin/dbp1') {
      this.title = 'QUẢN LÝ BÀI ĐĂNG';
      this.onLoadData = () => {
        this.project$ = this.projectService.findPendingProject()
      }
    } else {
      this.title = 'QUẢN LÝ BÀI VIẾT';
      this.onLoadData = () => {
        this.project$ = this.projectService.findAll();
      }
    }
    this.onLoadData();
    this.ngOnInitColumn();
  }

  private ngOnInitColumn(): void {
    this.columnDefs = [
      COLUMN_STT,
      {
        headerName: 'HÌNH ẢNH',
        headerTooltip: 'HÌNH ẢNH',
        minWidth: 150,
        maxWidth: 150,
        cellStyle: {
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center'
        },
        cellRenderer: (params: any) => {
          return `<img src="${environment.IMAGE_STORE_URL}${params.data.avatar}" class="w-100 h-100" />`
        },
        onCellClicked: ({data}) => {
          const title = Utils.toLowerCaseNonAccentVietnamese(data.title).replace(/\s/g, '-');
          this.router.navigate(['/project',title], {
              queryParams: {
                  id: data.id
              }
          });
        }
      },
      {
        headerName: 'TIÊU ĐỀ',
        headerTooltip: 'TIÊU ĐỀ',
        minWidth: 150,
        cellStyle: {
          'top': '30px'
        },
        field: 'title',
        tooltipField: 'title',
      },
      {
        headerName: 'TÁC GIẢ',
        headerTooltip: 'TÁC GIẢ',
        minWidth: 100,
        cellStyle: {
          'top': '30px'
        },
        field: 'createdByName',
        tooltipField: 'createdByName',
      },
      {
        headerName: 'NGÀY ĐĂNG',
        headerTooltip: 'NGÀY ĐĂNG',
        minWidth: 120,
        maxWidth: 120,
        cellStyle: {
          'top': '30px'
        },
        valueGetter: ({ data }) => {
          return formatDate(data.createdDate, 'dd/MM/yyyy', 'en_US');
        }
      },
      {
        headerName: 'TRẠNG THÁI',
        headerTooltip: 'TRẠNG THÁI',

        minWidth: 150,
        maxWidth: 150,

        field: 'statusName',
        tooltipField: 'statusName',
        cellStyle: ({ data }) => {
          return {
            'top': '30px',
            'color': data.status == 0 ? '#5ad1e8' : data.status == 1 ? '#65df87' : '#e85757'
          }
        }
      },
      {
        headerName: 'SỐ TIỀN',
        headerTooltip: 'SỐ TIỀN',
        minWidth: 150,
        cellStyle: {
          'top': '30px'
        },
        valueGetter: ({ data }) => {
          return this.currencyPipe.transform(data.money, 'VND');
        }
      },

    ];

    if (this.router.url !== '/admin/dbp1') {
      this.columnDefs.push({
        headerName: 'NGÀY SỬA',
        headerTooltip: 'NGÀY SỬA',
        minWidth: 120,
        maxWidth: 120,
        cellStyle: {
          'top': '30px'
        },
        valueGetter: ({ data }) => {
          if (!data.modifiedDate) return null;
          return formatDate(data.modifiedDate, 'dd/MM/yyyy', 'en_US');
        }
      });
      this.columnDefs.push({
        headerName: 'NGƯỜI SỬA',
        headerTooltip: 'NGƯỜI SỬA',
        minWidth: 120,
        cellStyle: {
          'top': '30px'
        },
        field: 'modifier',
        tooltipField: 'modifier',
      });
    }

    this.columnDefs.push({
      headerName: 'THAO TÁC',
      headerTooltip: 'THAO TÁC',
      minWidth: 110,
      maxWidth: 110,

      cellRenderer: DbpActionComponent,
      cellStyle: {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'overflow': 'unset'
      },
    })
  }
}