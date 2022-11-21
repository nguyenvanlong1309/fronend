import { UserComponent } from './../user.component';
import { ConfirmationComponent } from './../../shared/confirmation/confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserResponseModel } from 'src/app/models/user.model';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, OnDestroy, Type } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';
import { UserService } from 'src/app/services/user.service';
import { Confirmation } from 'src/app/base/confirmation/confirmation.enum';
import { filter, Subject, takeUntil } from 'rxjs';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
    selector: 'app-user-action',
    templateUrl: './user-action.component.html',
    styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements ICellRendererAngularComp, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public params: ICellRendererParams<UserResponseModel, any>;
    private context: UserComponent;

    constructor(
        private ngbModal: NgbModal,
        private userService: UserService
    ) {}

    public agInit(params: ICellRendererParams<UserResponseModel, any>): void {
        this.params = params;
        this.context = this.params.context;
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public ngOnUpdateUser(): void {
        const ref = this.ngbModal.open(UserFormComponent, {
            centered: true,
            animation: true,
        });
        ref.componentInstance.user = this.params.data;
        ref.closed
            .pipe(filter(res => res == Confirmation.CONFIRM))
            .subscribe(res => {
                this.context.ngOnLoadUser()
            });
    }

    public ngOnLockUser(): void {
        this.ngOnActionUser({
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn khóa user?'
        }, 'lockUser');
    }

    public ngOnUnlockUser(): void {
        this.ngOnActionUser({
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn mở khóa user?'
        }, 'unlockUser');
    }

    private ngOnActionUser(content: {title: string, message: string}, action: 'lockUser' | 'unlockUser'): void {
        const ref = this.ngbModal.open(ConfirmationComponent, {
            centered: true,
            animation: true
        });
        ref.componentInstance.content = content;

        ref.closed
            .pipe(filter(res => res == Confirmation.CONFIRM))
            .subscribe(res => {
                this.userService[action](this.params.data.username)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(r => this.context.ngOnLoadUser())
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}