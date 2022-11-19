import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Project } from "src/app/models/project.model";
import { ProjectService } from 'src/app/services/project.service';
import { PersonalComponent } from './personal/personal.component';
import { BusinessesComponent } from './businesses/businesses.component';
import { DonateService } from 'src/app/services/donate.service';
import { DonateTop } from 'src/app/models/donate.model';
import { ColDef } from 'ag-grid-community';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-donate',
    templateUrl: './donate.component.html',
    styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit{
    
    public donateTop$: Observable<DonateTop[]>;
    public columnDefs: ColDef[];
    public project: Project;

    constructor(
        private router: ActivatedRoute,
        private projectService: ProjectService,
        private donateService: DonateService,
        private _router: Router,
        private currencyPipe: CurrencyPipe,
    ) {}

    public ngOnInit(): void {
        this.router.queryParams.subscribe(res => {
            if (!res['project-id']) return;
            this.ngOnInitColumn();
            if (this._router.url.startsWith('/donate/business')) {
                this.donateTop$ = this.donateService.findTopDonate(1);
            } else {
                this.donateTop$ = this.donateService.findTopDonate(0);
            }
            this.projectService.findById(res['project-id']).subscribe(res => {
                this.project = res;
            })
        })
    }

    private ngOnInitColumn(): void {
        this.columnDefs = [
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
    }

    public loadComponent(com: PersonalComponent | BusinessesComponent): void {
        com.project = this.project;
    }
}