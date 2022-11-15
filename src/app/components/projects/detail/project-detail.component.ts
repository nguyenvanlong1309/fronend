import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from './../../../services/project.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "src/app/models/project.model";

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    public project: Project;

    constructor(
        private router: ActivatedRoute,
        private projectService: ProjectService,
        private _router: Router,
    ) {}

    public ngOnInit(): void {
        this.router.queryParams.subscribe(res => {
            this.projectService.findById(res.id)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(res => {
                    this.project = res;
                })
        })
    }

    public naviateDonate(path: string): void {
        this._router.navigate([path], {
            queryParams: {
                'project-id': this.project.id
            }
        })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.next();
        this.unsubscribe$?.complete();
    }
}