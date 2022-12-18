import { formatDate } from '@angular/common';
import { filter, Subject, takeUntil } from 'rxjs';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, OnDestroy } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { DbpComponent } from '../dbp.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostFormComponent } from 'src/app/components/shared/post-form/post-form.component';
@Component({
    selector: 'app-dbp-action',
    templateUrl: './dbp-action.component.html',
    styleUrls: ['./dbp-action.component.css']
})
export class DbpActionComponent implements ICellRendererAngularComp, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public params: ICellRendererParams<Project, any>;
    private context: DbpComponent;
    public project: Project;
    
    constructor(
        private projectService: ProjectService,
        private toastService: ToastrService,
        private ngbModal: NgbModal
    ) {}

    public agInit(params: ICellRendererParams<Project, any>): void {
        this.params = params;
        this.context = params.context;
        this.project = {
            ...this.params.data,
            startDate: formatDate(this.params.data.startDate, 'yyyy-MM-dd', 'en_US'),
            endDate: this.params.data.endDate ? formatDate(this.params.data.endDate, 'yyyy-MM-dd', 'en_US') : null
        }
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public approveProject(): void {
        this.projectService.approveProject(this.params.data.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.toastService.success('Phê duyệt thành công');
                this.context.onLoadData();
            })
    }

    public lockProject(): void {
        this.projectService.lockProject(this.params.data.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.toastService.success('Phê duyệt thành công');
                this.context.onLoadData();
            })
    }

    public updateProject(): void {
        const ref = this.ngbModal.open(PostFormComponent, {
			scrollable: true,
			centered: true,
			animation: true,
			size: 'lg',
			backdrop : 'static',
      		keyboard : false
		});
        ref.componentInstance.project = this.project;
        ref.closed
            .pipe(
                filter(res => res === 'OK'),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(res => {
                this.context.onLoadData();
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
