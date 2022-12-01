import { Confirmation } from './../../../../base/confirmation/confirmation.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/base/utils';
import { UserModel, UserResponseModel } from 'src/app/models/user.model';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/base/validators/custom.validator';
import { REGEX_PHONE_VIETNAME } from 'src/app/base/constant';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public formGroup: FormGroup;
    public user: UserResponseModel;
    public session: UserModel = this.authService.currentUser$.getValue();

    public get formControl() {
        return this.formGroup.controls;
    }

    constructor(
        private fb: FormBuilder,
        private toastService: ToastrService,
        private activeModa: NgbActiveModal,
        private authService: AuthService
    ) {}

    public ngOnInit(): void {
        this.ngOnBuildForm();
        this.formGroup.patchValue(this.user);   
    }
    
    private ngOnBuildForm(): void {
        this.formGroup = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(5)]],
            fullName: [null, [Validators.required, CustomValidators.onlyText]],
            email: [null, [Validators.required, Validators.email]],
            phone: [null, [Validators.required, Validators.pattern(REGEX_PHONE_VIETNAME)]],
            address: [null],
            role: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    public ngOnSubmit(): void {
        Utils.beforeSubmitForm(this.formGroup);
        if (this.formGroup.invalid) {
            this.toastService.error('Thông tin không hợp lệ.');
            return;
        };
        this.authService.regisUser({
            ...this.formGroup.value,
            role: this.session.user.role
        })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
            this.toastService.success('Thêm mới thành công.');
            this.activeModa.close(Confirmation.CONFIRM);
        });

        
    }

    public ngOnClose(): void {
        this.activeModa.close();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}