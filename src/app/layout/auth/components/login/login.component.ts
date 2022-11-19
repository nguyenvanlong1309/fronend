import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Role } from 'src/app/base/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private toastService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ngBuildForm();
  }

  ngBuildForm(): void {
    this.formGroup = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  ngSubmitForm(): void {
    if (this.formGroup.invalid) return;
    this.loginService.login(this.formGroup.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.toastService.success('Đăng nhập thành công')
        if (res.user.role == Role.ADMIN) {
          this.router.navigate(['/admin', 'home']);
          return;
        }
        this.router.navigate(['/home']);
      })

  }

  ngOnDestroy(): void {
    this.unsubscribe$?.next();
    this.unsubscribe$?.complete();
  }

}
