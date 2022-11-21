import { Confirmation } from './../../../../base/confirmation/confirmation.enum';
import { UserComponent } from './../user.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/base/utils';
import { UserResponseModel } from 'src/app/models/user.model';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public formGroup: FormGroup;
    public user: UserResponseModel;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private toastService: ToastrService,
        private activeModa: NgbActiveModal,
    ) {}

    public ngOnInit(): void {
        this.ngOnBuildForm();
        this.formGroup.patchValue(this.user);   
    }
    
    private ngOnBuildForm(): void {
        this.formGroup = this.fb.group({
            username: [null, [Validators.required]],
            fullName: [null, [Validators.required]],
            email: [null, [Validators.email]],
            phone: [null, [Validators.required, Validators.pattern('^(0|\\+84)[0-9]{9}')]],
            address: [null],
            role: [null, [Validators.required]],
        });
        this.formGroup.get('username').disable();
    }

    public ngOnSubmit(): void {
        Utils.beforeSubmitFomr(this.formGroup);
        if (this.formGroup.invalid) return;

        this.userService.updateInfo({
            ...this.formGroup.value,
            username: this.user.username
        })
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.toastService.success('Cập nhật thông tin thành công');
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