import { formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project.model';
import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { MyProjectComponent } from '../my-project.component';
import { PostFormComponent } from 'src/app/components/shared/post-form/post-form.component';

@Component({
    selector: 'app-my-project-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.css']
})
export class MyProjectActionComponent implements ICellRendererAngularComp {

    public params: ICellRendererParams<Project, any>;

    constructor(
        private ngbModal: NgbModal
    ) {}


    public agInit(params: ICellRendererParams<Project, any>): void {
        this.params = params;
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public updateProject(): void {
        const ref = this.ngbModal.open(PostFormComponent, {
            size: 'lg',
            centered: true,
            animation: true,
        })
        ref.componentInstance.project = {
            ...this.params.data,
            startDate: formatDate(this.params.data.startDate, 'yyyy-MM-dd', 'en_US'),
            endDate: this.params.data.endDate ? formatDate(this.params.data.endDate, 'yyyy-MM-dd', 'en_US') : null
        };

        ref.closed.subscribe(res => {
            if (res != 'OK') return;
            const context = this.params.context as MyProjectComponent;
            context.loadDataProject();
        })
    }
}
