import { Project } from 'src/app/models/project.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
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
