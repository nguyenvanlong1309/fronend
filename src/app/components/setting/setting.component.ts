import { UserResponseModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  user: UserResponseModel;
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser$.getValue().user;
    this.ngBuildForm();
    this.formGroup.patchValue(this.user);
  }

  ngBuildForm(): void {
    this.formGroup = this.fb.group({
      fullName: [null, [Validators.required]],
      phone: [null],
    })
  }
}
