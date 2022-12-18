import { Subject, takeUntil, Observable } from 'rxjs';
import { ProjectService } from './../../../services/project.service';
import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "src/app/models/project.model";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DonateService } from 'src/app/services/donate.service';
import { DonateTop } from 'src/app/models/donate.model';
import { ColDef } from 'ag-grid-community';
import { COLUMN_STT } from 'src/app/base/constant';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public project: Project;

    constructor(
        private router: ActivatedRoute,
        private projectService: ProjectService,
        private _router: Router,
        private ngbModal: NgbModal,
        private donateService: DonateService,
        private currencyPipe: CurrencyPipe,
    ) {}

    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

    public ngOnInit(): void {
        this.router.queryParams.subscribe(res => {
            this.projectService.findById(res.id)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(res => {
                    this.project = res;
                })
        })
    }

    public naviateDonate(path: string): void {
        this._router.navigate([path], {
            queryParams: {
                'project-id': this.project.id
            }
        })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.next();
        this.unsubscribe$?.complete();
    }
}
