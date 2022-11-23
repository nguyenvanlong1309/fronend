import { MyDonateComponent } from 'src/app/components/setting/my-donate/my-donate.component';
import { ToastrService } from 'ngx-toastr';
import { Utils } from './../../base/utils';
import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostFormComponent } from './post-form/post-form.component';
import { UserService } from 'src/app/services/user.service';
import { MyProjectComponent } from './my-project/my-project.component';

@Component({
  	selector: 'app-setting',
  	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
	isModal: boolean = false;
	user: UserModel;
	formGroup: FormGroup;
	closeResult: string;
	isPO: boolean;

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private modalService: NgbModal,
		private userService: UserService,
		private toastService: ToastrService
	) {}

	ngOnInit(): void {
		this.user = this.authService.currentUser$.getValue();
		this.isPO = this.user.user.role === 'PO';
		this.ngBuildForm();
		this.formGroup.patchValue(this.user.user);
	}

	ngBuildForm(): void {
		this.formGroup = this.fb.group({
			fullName: [null, [Validators.required]],
			phone: [null],
			username: [{ value: null, disabled: true }],
			address: [null],
			email: [null],
			id: [null],
		});
	}

	ngOnSubmit(): void {
		Utils.beforeSubmitFomr(this.formGroup);
		if (this.formGroup.invalid) return;
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
		});
	}
}
