import { CurrencyPipe, formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from "@angular/core";
import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';
import { MyProjectActionComponent } from './action/action.component';

@Component({
    selector: 'app-my-project',
    templateUrl: './my-project.component.html',
    styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent implements OnInit {

    public columnDefs: ColDef[];
    public project$: Observable<Project[]>;

    constructor(
        public activedModal: NgbActiveModal,
        private projectService: ProjectService,
        private currencyPipe: CurrencyPipe
    ) {}

    public ngOnInit(): void {
        this.ngOnInitColumn();
        this.loadDataProject();
    }

    public loadDataProject(): void {
        this.project$ = this.projectService.findMyProject();
    }

    private ngOnInitColumn(): void {
        this.columnDefs = [
            {
                headerName: 'STT',
                headerTooltip: 'STT',
                minWidth: 60,
                maxWidth: 60,
                cellStyle: {
                    'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center'
                },
                valueGetter: (params: ValueGetterParams) => {
                    return params.node.rowIndex + 1;
                }
            },
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
                }
            },
            {
                headerName: 'TIÊU ĐỀ',
                headerTooltip: 'TIÊU ĐỀ',
                minWidth: 120,
                field: 'title',
                tooltipField: 'title',
                cellStyle: {
                    'top': '30px'
                }
            },
            {
                headerName: 'THỜI GIAN',
                headerTooltip: 'THỜI GIAN',
                minWidth: 200,
                maxWidth: 200,

                valueGetter: ({data}) => {
                    const startDate = formatDate(new Date(data.startDate), 'dd/MM/yyyy', 'en-US')
                    const endDate = formatDate(new Date(data.endDate), 'dd/MM/yyyy', 'en-US')
                    return `${startDate} - ${endDate}`
                },
                cellStyle: {
                    'top': '30px'
                }
            },
            {
                headerName: 'TRẠNG THÁI',
                headerTooltip: 'TRẠNG THÁI',

                minWidth: 100,
                maxWidth: 150,

                field: 'statusName',
                tooltipField: 'statusName',
                cellStyle: ({data}) => {
                    return {
                        'top': '30px',
                        'color': data.status == 0 ? '#5ad1e8' : data.status == 1 ? '#65df87' : '#e85757'
                    }
                }
            },
            {
                headerName: 'TỔNG TIỀN',
                headerTooltip: 'TỔNG TIỀN',
                minWidth: 100,
                
                valueGetter: ({data}) => {
                    return this.currencyPipe.transform(data.total || 0, 'VND');
                },
                cellStyle: {
                    'top': '30px'
                }
            },
            {
                headerName: 'THAO TÁC',
                headerTooltip: 'THAO TÁC',
                minWidth: 110,
                maxWidth: 110,
                cellStyle: {
                    'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center'
                },
                cellRenderer: MyProjectActionComponent
            }
        ]
    }
}