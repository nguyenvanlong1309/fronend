import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserResponseModel } from 'src/app/models/user.model';
import { MyDonateComponent } from 'src/app/components/setting/my-donate/my-donate.component';
import { MyProjectComponent } from 'src/app/components/setting/my-project/my-project.component';
import { ProjectService } from 'src/app/services/project.service';
import { DonateService } from 'src/app/services/donate.service';

@Component({
    selector: 'app-show-detail',
    templateUrl: './show-detail.component.html',
    styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements ICellRendererAngularComp {

    public params: ICellRendererParams<UserResponseModel, any>;

    constructor(
        private ngbModal: NgbModal,
        private projectService: ProjectService,
        private donateService: DonateService,
    ) {}

    public agInit(params: ICellRendererParams<UserResponseModel, any>): void {
        this.params = params;
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public openDetail(): void {
        const { username } = this.params.data;
        const type = this.params.colDef.type as 'DONATE' | 'PROJECT';
        const ref = this.ngbModal.open((type === 'DONATE' ? MyDonateComponent : MyProjectComponent), {
            size: 'xl',
            animation: true,
            centered: true,
        });
        ref.componentInstance.data$ = type === 'DONATE' 
            ? this.donateService.findDonateByUsername(username)
            : this.projectService.findProjectByUsername(username);
    }
}