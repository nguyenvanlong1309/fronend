import { Confirmation } from './../../../base/confirmation/confirmation.enum';
import { BankComponent } from './../bank/bank.component';
import { METHOD_DONATE, REGEX_PHONE_VIETNAME } from '../../../base/constant';
import { Subject, takeUntil, filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DonateService } from 'src/app/services/donate.service';
import { Utils } from 'src/app/base/utils';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DonateComponent } from '../donate.component';
import { CustomValidators } from 'src/app/base/validators/custom.validator';

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
  public moneyAsText: string;
  public context: DonateComponent;

  public get formControl() {
    return this.formGroup.controls;
  }

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
      fullName: [null, [Validators.required, CustomValidators.onlyText]],
      publicName: [null, [Validators.required, CustomValidators.onlyText]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(REGEX_PHONE_VIETNAME)]],
      methodDonate: [0, [Validators.required]],
      money: [null, [Validators.required, Validators.min(1)]],
      comment: [null],
      mode: ['0'],
      projectId: [this.project.id],
    });
    this.formGroup.get('money').valueChanges.subscribe(res => {
      if (!res|| res < 1) {
        this.moneyAsText = '';
        return;
      }
      this.moneyAsText = Utils.moneyAsText(res);
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
    Utils.beforeSubmitForm(this.formGroup);
    if (this.formGroup.invalid) {
      this.toastService.error('Thông tin không hợp lệ.');
      return;
    };
    const ref = this.modalService.open(BankComponent, {
      size: 'lg',
      centered: true,
      animation: true
    });
    const component = ref.componentInstance as BankComponent;
    component.money = this.formGroup.get('money').value;

    ref.closed
      .pipe(filter(res => res == Confirmation.CONFIRM))
      .subscribe(res => {
        this.donateService.donatePersonal(this.formGroup.getRawValue())
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
            this.toastService.success('Tài trợ thành công');
            this.formGroup.reset();
            this.formGroup.enable();
            this.isUseSessionUser = false;
            this.context.loadDonateTop();
          })
      })
  }

  public ngOnDestroy(): void {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
  }
}
