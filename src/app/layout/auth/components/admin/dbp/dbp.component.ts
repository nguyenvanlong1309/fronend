import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dbp',
  templateUrl: './dbp.component.html',
  styleUrls: ['./dbp.component.css']
})
export class DbpComponent implements OnInit {

  isModal: boolean = false;
  formGroup: FormGroup;

  closeResult: string;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private HttpClient: HttpClient,
    private modalService: NgbModal
  ) {
   }

  ngOnInit(): void {
  }

  openXl(content:any) {
		this.modalService.open(content, { size: 'xl' });
	}

  openXl2(historyDonate:any) {
		this.modalService.open(historyDonate, { size: 'xl' });
	}

  openScrollableContent(longContent:any) {
		this.modalService.open(longContent, { scrollable: true });
	}

  url = 'assets/images/noimage.png';
  onSelect(event:any) {
    let fileType = event.target.files[0].type;
    var fileSelected = event.target.files[0].type;
    if (fileSelected.length > 0) {
      for (var i = 0; i < fileSelected.length; i++) {
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
  }

}
