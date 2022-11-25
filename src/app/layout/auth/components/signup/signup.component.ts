import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Utils } from 'src/app/base/utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  formGroup: FormGroup;

  public get formControl() {
    return this.formGroup.controls;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ngBuildForm();
  }

  ngBuildForm(): void {
    this.formGroup = this.fb.group({
      fullName: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required]],
      passwordConfirmation: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('^(0|\\+84)[0-9]{9}')]],
      email: [null, [Validators.required, Validators.email]],
      role: ['USER']
    })
  }

  ngSubmitForm(): void {
    Utils.beforeSubmitForm(this.formGroup);
    if (this.formGroup.invalid) return;
    const { value } = this.formGroup;
    if (value.password != value.passwordConfirmation) {
      this.toastService.error('Xác nhận mật khẩu không khớp.')
      return;
    }

    this.authService.regisUser(value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.toastService.success('Đăng ký thành công');
        this.router.navigate(['/auth', 'log-in']);
      })
  }

  ngOnDestroy(): void {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
  }
}
