import { Observable } from 'rxjs';
import { Component, OnInit, HostListener} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

import { PROJECT_STATUS } from './../../base/constant';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { DonateService } from 'src/app/services/donate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),

  ]
})
export class HomeComponent implements OnInit {

  public project$: Observable<Project[]>;
  public status = PROJECT_STATUS;
  public totalDonateAndProject;
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(
    private projectService: ProjectService,
    private donateService: DonateService,
    private scroll: ViewportScroller,
  ) { }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  ngOnInit(): void {
    // lấy 5 bài đăng mới nhất
    this.project$ = this.projectService.findAll(5);
    this.donateService.getTotalProjectAndDonate()
      .subscribe(res => this.totalDonateAndProject = res);
  }
}
