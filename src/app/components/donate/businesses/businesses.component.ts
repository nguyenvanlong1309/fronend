import { Project } from 'src/app/models/project.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { METHOD_DONATE } from 'src/app/base/constant';
import { Utils } from 'src/app/base/utils';
import { DonateService } from 'src/app/services/donate.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();
  public project: Project;
  public formGroup: FormGroup;
  public avatar: {file: File, url: string} = {
    file: null,
    url: 'assets/images/noimage.png'
  }
  public methodDonate = METHOD_DONATE;

  constructor(
    private fb: FormBuilder,
    private donateService: DonateService,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.ngBuildForm();
  }

  ngBuildForm(): void {
    this.formGroup = this.fb.group({
      publicName: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('^(0|\\+84)[0-9]{9}')]],
      email: [null, [Validators.required, Validators.email]],
      money: [null, [Validators.required]],
      comment: [null],
      methodDonate: [0, [Validators.required]],
      projectId: [this.project.id, [Validators.required]]
    })
  }
  
  onSelect(event:any) {
    const file = event.target.files[0];
    const fileType = file.type;
    if (!fileType.match(/image\/*/)) {
      this.toastService.error('Vui lòng chọn định dạng hình ảnh chính xác');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.avatar = {
        url: event.target.result,
        file: file
      }
    };
  }

  public ngSubmitForm(): void {
    Utils.beforeSubmitFomr(this.formGroup);
    console.log(this.formGroup.value);
    if (this.formGroup.invalid) return;
    const formData = new FormData();
    formData.append('donate', new Blob([JSON.stringify(this.formGroup.value)], {
      type: 'application/json'
    }));
    formData.append('avatar', this.avatar.file);
    this.donateService.donateBusiness(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.toastService.success('Tài trợ thành công');
        this.formGroup.reset();
      })
  }

  public ngOnDestroy(): void {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
  }
}