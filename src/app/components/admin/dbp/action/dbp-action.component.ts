import { formatDate } from '@angular/common';
import { filter } from 'rxjs';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { DbpComponent } from '../dbp.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostFormComponent } from 'src/app/components/setting/post-form/post-form.component';

@Component({
    selector: 'app-dbp-action',
    templateUrl: './dbp-action.component.html',
    styleUrls: ['./dbp-action.component.css']
})
export class DbpActionComponent implements ICellRendererAngularComp {

    public params: ICellRendererParams<Project, any>;
    private context: DbpComponent;

    constructor(
        private projectService: ProjectService,
        private toastService: ToastrService,
        private ngbModal: NgbModal
    ) {}

    public agInit(params: ICellRendererParams<Project, any>): void {
        this.params = params;
        this.context = params.context;
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public approveProject(): void {
        this.projectService.approveProject(this.params.data.id)
            .subscribe(res => {
                this.toastService.success('Phê duyệt thành công');
                this.context.onLoadData();
            })
    }

    public updateProject(): void {
        const ref = this.ngbModal.open(PostFormComponent, {
            centered: true,
            animation: true,
            size: 'lg',
        });
        ref.componentInstance.project = {
            ...this.params.data,
            startDate: formatDate(this.params.data.startDate, 'yyyy-MM-dd', 'en_US'),
            endDate: !this.params.data.endDate || formatDate(this.params.data.endDate, 'yyyy-MM-dd', 'en_US')
        };
        ref.closed
            .pipe(filter(res => res === 'OK'))
            .subscribe(res => {
                this.context.onLoadData();
            })
    }
}