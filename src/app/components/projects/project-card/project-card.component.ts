import { Utils } from './../../../base/utils';
import { Project } from 'src/app/models/project.model';
import { PROJECT_STATUS } from './../../../base/constant';
import { Component, Input, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

    @Input() project: Project;
    @Input() animatedBorder: boolean = true;

    public status = PROJECT_STATUS;

    constructor(
        private router: Router,
        private projectService: ProjectService,
    ) {}

    public ngOnInit(): void {
        
    }

    public navigate(project: Project): void {
        const title = Utils.toLowerCaseNonAccentVietnamese(project.title).replace(/\s/g, '-');
        this.router.navigate(['/project',title], {
            queryParams: {
                id: project.id
            }
        });
    }
}