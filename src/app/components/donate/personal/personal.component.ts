import { METHOD_DONATE } from '../../../base/constant';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DonateService } from 'src/app/services/donate.service';
import { Utils } from 'src/app/base/utils';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  public formGroup: FormGroup;
  public isLogin: boolean;
  public project: Project;
  public isUseSessionUser: boolean;
  public methodDonate = METHOD_DONATE;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private donateService: DonateService,
    private toastService: ToastrService,
    private modalService: NgbModal

  ) { }

  public ngOnInit(): void {
    this.isLogin = Boolean(this.authService.currentUser$.getValue());
    this.ngOnInitForm();
  }

  public ngOnInitForm(): void {
    this.formGroup = this.fb.group({
      fullName: [null, [Validators.required]],
      publicName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      methodDonate: [0, [Validators.required]],
      money: [null, [Validators.required]],
      comment: [null],
      mode: ['0'],
      projectId: [this.project.id],
    })
  }

  public ngUseSessionUser(): void {
    if (this.isUseSessionUser) {
      const user = this.authService.currentUser$.getValue().user;
      this.formGroup.patchValue(user);
      Object.keys(user).forEach(key => {
        if (user[key]) {
          this.formGroup.get(key)?.disable();
        }
      })
      return;
    }
    this.formGroup.enable();
  }

  public ngSubmitForm(): void {
    Utils.beforeSubmitFomr(this.formGroup);
    if (this.formGroup.invalid) return;
    this.donateService.donatePersonal(this.formGroup.getRawValue())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.toastService.success('Tài trợ thành công');
        this.formGroup.reset();
        this.formGroup.enable();
        this.isUseSessionUser = false;
      })
  }

  public ngOnDestroy(): void {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
  }

  openVerticallyCentered(content) {
		this.modalService.open(content, { centered: true });
	}
}
