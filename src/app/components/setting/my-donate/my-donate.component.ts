import { Observable } from 'rxjs';
import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from "@angular/core";
import { CurrencyPipe, formatDate } from '@angular/common';
import { Donate } from 'src/app/models/donate.model';
import { DonateService } from 'src/app/services/donate.service';

@Component({
    selector: 'app-my-donate',
    templateUrl: './my-donate.component.html',
    styleUrls: ['./my-donate.component.css']
})
export class MyDonateComponent implements OnInit {

    public columnDefs: ColDef[];
    public donate$: Observable<Donate[]>;

    constructor(
        public activedModal: NgbActiveModal,
        private currencyPipe: CurrencyPipe,
        private donateService: DonateService,
    ) {}

    public ngOnInit(): void {
        this.donate$ = this.donateService.findMyDonate();
        this.ngOnInitColumn();
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
                headerName: 'TIÊU ĐỀ',
                headerTooltip: 'TIÊU ĐỀ',
                minWidth: 120,
                field: 'title',
                tooltipField: 'title',
                cellStyle: {
                    'top': '4px'
                }
            },

            {
                headerName: 'THỜI GIAN',
                headerTooltip: 'THỜI GIAN',
                minWidth: 150,
                valueGetter: ({data}) => {
                    return formatDate(data.createdDate, 'dd/MM/yyyy', 'en_US');
                },
                cellStyle: {
                    'top': '4px'
                }
            },
           
            {
                headerName: 'SỐ TIỀN',
                headerTooltip: 'SỐ TIỀN',
                minWidth: 100,
                
                valueGetter: ({data}) => {
                    return this.currencyPipe.transform(data.total || 0, 'VND');
                },
                cellStyle: {
                    'top': '4px'
                }
            },
        ]
    }
}