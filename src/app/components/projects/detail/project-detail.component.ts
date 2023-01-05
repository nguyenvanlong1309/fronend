import { filter, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

import { ProjectService } from './../../../services/project.service';
import { Project } from "src/app/models/project.model";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/base/role.enum';
import { ConfirmationComponent } from 'src/app/components/admin/shared/confirmation/confirmation.component';
import { Confirmation } from 'src/app/base/confirmation/confirmation.enum';

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css'],
    animations: [
      fadeInOnEnterAnimation(),
      fadeOutOnLeaveAnimation()
    ]
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public project: Project;
    public images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
    public isAdmin: boolean = false;

    constructor(
        private router: ActivatedRoute,
        private projectService: ProjectService,
        private _router: Router,
        private toastService: ToastrService,
        private authService: AuthService,
        private modalService: NgbModal
    ) {}

    public ngOnInit(): void {
        const user = this.authService.currentUser$.getValue();
        this.isAdmin = user && user.user.role === Role.ADMIN;
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

    public approveProject(): void {
        this.projectService.approveProject(this.project.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.toastService.success('Phê duyệt thành công');
                this._router.navigate(['admin', 'dbp']);
            })
    }

    public cancelProject(): void {
        const ref = this.modalService.open(ConfirmationComponent, {
            animation: true,
            centered: true,
        });
        ref.componentInstance.content = {
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn hủy?'
        };
        ref.closed
            .pipe(filter(res => res === Confirmation.CONFIRM))
            .subscribe(res => {
                this.projectService.cancelProject(this.project.id)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(res => {
                        this.toastService.success('Hủy bỏ thành công');
                        this._router.navigate(['admin', 'dbp1']);
                    })
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.next();
        this.unsubscribe$?.complete();
    }
}
