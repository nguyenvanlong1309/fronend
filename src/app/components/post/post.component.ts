import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

// import $ from "jquery";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  uploadingText = 'Chọn file (chỉ chấp nhận file ảnh)';
  uploadResult: any = {
    progress: 0,
    uploadingText: this.uploadingText,
    fileUrl: null
  }
  constructor(private title: Title) { }
  ngOnInit() {
    this.title.setTitle("Angular 4 - Upload file");
  }
  doUploadFile() {
    this.uploadResult.progress = 0;
    this.uploadResult.fileUrl = null;
    this.uploadResult.uploadingText = this.uploadingText;
    // $("#fileUploadInput").trigger("click");
  }
  fileChange(event:any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file);
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let json = JSON.parse(xhr.response);
            let fileUrl = 'http://minhquandalat.com/uploads/' + json.Name;
            this.uploadResult.progress = 100;
            this.uploadResult.fileUrl = fileUrl;
            this.uploadResult.uploadingText = "Hoàn thành";

          } else {
            console.log(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        this.uploadResult.uploadingText = "Đang tải ảnh lên...";
        let percentVal = Math.round(event.loaded / event.total * 100);
        this.uploadResult.progress = percentVal;
      };
      xhr.open('POST', "http://minhquandalat.com/api/FileUpload", true);
      xhr.send(formData);
    }
  }

}
