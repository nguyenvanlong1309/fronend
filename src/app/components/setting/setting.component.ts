import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

import { AuthService } from 'src/app/services/auth.service';
import { MyDonateComponent } from 'src/app/components/setting/my-donate/my-donate.component';
import { Utils } from './../../base/utils';
import { UserModel } from './../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MyProjectComponent } from './my-project/my-project.component';
import { PostFormComponent } from '../shared/post-form/post-form.component';
import { REGEX_ONLY_TEXT, REGEX_PHONE_VIETNAME } from 'src/app/base/constant';
import { CustomValidators } from 'src/app/base/validators/custom.validator';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class SettingComponent implements OnInit {
	isModal: boolean = false;
	user: UserModel;
	formGroup: FormGroup;
	closeResult: string;
	isPO: boolean;
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

	public get formControl() {
		return this.formGroup.controls;
	}

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private modalService: NgbModal,
		private userService: UserService,
		private toastService: ToastrService,
    private scroll: ViewportScroller,

	) {}

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

	ngOnInit(): void {
		this.user = this.authService.currentUser$.getValue();
		this.isPO = this.user.user.role === 'PO';
		this.ngBuildForm();
		this.formGroup.patchValue(this.user.user);
	}

	ngBuildForm(): void {
		this.formGroup = this.fb.group({
			fullName: [null, [Validators.required, CustomValidators.onlyText ]],
			phone: [null, [Validators.required, Validators.pattern(REGEX_PHONE_VIETNAME)]],
			username: [{ value: null, disabled: true }],
			address: [null],
			email: [null, [Validators.required, Validators.email]],
			id: [null],
		});
	}

	ngOnSubmit(): void {
		Utils.beforeSubmitForm(this.formGroup);
		if (this.formGroup.invalid) {
			this.toastService.error('Thông tin không hợp lệ.');
			return;
		};
		this.userService
			.updateInfo(this.formGroup.getRawValue())
			.subscribe((res) => {
				this.toastService.success('Cập nhật thông tin thành công');
				this.authService.currentUser$.next({
				token: this.user.token,
				user: res,
				});
				this.user.user = res;
			});
	}

	openMyProject() {
		this.modalService.open(MyProjectComponent, { size: 'xl' });
	}

	openMyDonate() {
		this.modalService.open(MyDonateComponent, { size: 'xl' });
	}

	openPostForm(): void {
		this.modalService.open(PostFormComponent, {
			scrollable: true,
			centered: true,
			animation: true,
			size: 'lg',
			backdrop : 'static',
      		keyboard : false
		});
	}
}
