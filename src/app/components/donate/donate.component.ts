import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostListener } from "@angular/core";
import { ViewportScroller } from '@angular/common';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

import { Project } from "src/app/models/project.model";
import { ProjectService } from 'src/app/services/project.service';
import { PersonalComponent } from './personal/personal.component';
import { BusinessesComponent } from './businesses/businesses.component';
import { DonateService } from 'src/app/services/donate.service';
import { DonateTop } from 'src/app/models/donate.model';

@Component({
    selector: 'app-donate',
    templateUrl: './donate.component.html',
    styleUrls: ['./donate.component.css'],
    animations: [
      fadeInOnEnterAnimation(),
      fadeOutOnLeaveAnimation()
    ]
})
export class DonateComponent implements OnInit{

    public donateTop$: Observable<DonateTop[]>  = of([]);;
    public project: Project;
    public title: string;
    pageYoffset = 0;
    @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

    constructor(
        private router: ActivatedRoute,
        private projectService: ProjectService,
        private donateService: DonateService,
        private _router: Router,
        private scroll: ViewportScroller,
    ) {}

    scrollToTop(){
      this.scroll.scrollToPosition([0,0]);
    }

    public ngOnInit(): void {
        this.router.queryParams.subscribe(res => {
            if (!res['project-id']) return;
            this.loadDonateTop();
            this.projectService.findById(res['project-id']).subscribe(res => {
                this.project = res;
            })
        })
    }

    public loadDonateTop(): void {
        if (this._router.url.startsWith('/donate/business')) {
            this.donateTop$ = this.donateService.findTopDonate2(1);
            this.title = 'Những doanh nghiệp tài trợ nổi bật';
        } else {
            this.donateTop$ = this.donateService.findTopDonate2(0);
            this.title = 'Những cá nhân tài trợ nổi bật';
        }
    }

    public loadComponent(com: PersonalComponent | BusinessesComponent): void {
        com.project = this.project;
        com.context = this;
    }
}
