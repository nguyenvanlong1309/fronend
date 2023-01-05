import { Observable } from 'rxjs';
import { Component, OnInit, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ProjectsComponent implements OnInit {

  public project$: Observable<Project[]>;
  pageYoffset = 0;
    @HostListener('window:scroll', ['$event']) onScroll(event){
      this.pageYoffset = window.pageYOffset;
    }

  constructor(
    private projectService: ProjectService,
    private scroll: ViewportScroller,
  ) {}

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  ngOnInit(): void {
    this.project$ = this.projectService.findAll();
  }
}
