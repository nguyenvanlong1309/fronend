import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponseModel } from './../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {

  isModal: boolean = false;
  user: UserResponseModel;
  formGroup: FormGroup;

  closeResult: string;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private HttpClient: HttpClient,
    private modalService: NgbModal
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

  ngModal(): void {

  }


  // Load img
  url = 'assets/images/noimage.png';
  onSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    } else {
      window.alert('Vui lòng chọn định dạng hình ảnh chính xác !!!');
    }
  }

}
