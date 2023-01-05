import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.project$ = this.projectService.findAll();
  }
}
