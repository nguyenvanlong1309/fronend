import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, TemplateRef } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { Donate } from 'src/app/models/donate.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements ICellRendererAngularComp {

    public params: ICellRendererParams<Donate, any>;
    public modalRef: NgbModalRef;

    constructor(
        private ngbModal: NgbModal,
    ) {}

    public agInit(params: ICellRendererParams<Donate, any>): void {
        this.params = params;
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public openModal(templateRef: TemplateRef<any>): void {
        this.modalRef = this.ngbModal.open(templateRef, {
            centered: true,
            animation: true
        });
    }
}
