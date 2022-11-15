import { PROJECT_STATUS } from './../../base/constant';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public project$: Observable<Project[]>;
  public status = PROJECT_STATUS;

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.project$ = this.projectService.findAll();
  }
}
