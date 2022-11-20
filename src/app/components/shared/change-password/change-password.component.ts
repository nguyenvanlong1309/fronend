import { Confirmation } from 'src/app/base/confirmation/confirmation.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/base/utils';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private activedModal: NgbActiveModal,
        private authService: AuthService,
        private toastservice: ToastrService
    ) {}

    public ngOnInit(): void {
        this.ngOnInitForm();
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            currentPassword: [null, [Validators.required]],
            newPassword: [null, [Validators.required]],
            confirmationPassword: [null, [Validators.required]]
        })
    }

    public ngSubmitForm(): void {
        Utils.beforeSubmitFomr(this.formGroup);
        if (this.formGroup.invalid) return;
        const { value } = this.formGroup;

        if (value.confirmationPassword != value.newPassword) {
            this.toastservice.error('Mật khẩu xác nhận không khớp với mật khẩu mới');
            return;
        }
        this.authService.changePassword(value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.toastservice.success('Đổi mật khẩu thành công');
                this.ngOnCancel();
            })
    }

    public ngOnCancel(): void {
        this.activedModal.close(Confirmation.CANCEL);
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}