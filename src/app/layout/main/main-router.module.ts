import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BusinessesComponent } from "src/app/components/donate/businesses/businesses.component";
import { DonateComponent } from "src/app/components/donate/donate.component";
import { PersonalComponent } from "src/app/components/donate/personal/personal.component";
import { FinanceComponent } from "src/app/components/finance/finance.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { IntroduceComponent } from "src/app/components/introduce/introduce.component";

import { NewsComponent } from "src/app/components/news/news.component";
import { Tintuc1Component } from 'src/app/components/news/tintuc1/tintuc1.component';
import { Tintuc2Component } from 'src/app/components/news/tintuc2/tintuc2.component';
import { Tintuc3Component } from 'src/app/components/news/tintuc3/tintuc3.component';
import { Tintuc4Component } from 'src/app/components/news/tintuc4/tintuc4.component';

import { ProjectDetailComponent } from "src/app/components/projects/detail/project-detail.component";
import { ProjectsComponent } from "src/app/components/projects/projects.component";
import { SettingComponent } from "src/app/components/setting/setting.component";
import { AuthenGuard } from "src/app/guards/authen.guard";
import { MainLayoutComponent } from "./main.layout";

const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path:'',
          component: HomeComponent,
        },
        {
          path:'home',
          component: HomeComponent
        },
        {
          path:'introduce',
          component: IntroduceComponent
        },
        {
          path:'news',
          component: NewsComponent
        },
        {
          path:'tintuc1',
          component: Tintuc1Component
        },
        {
          path:'tintuc2',
          component: Tintuc2Component
        },
        {
          path:'tintuc3',
          component: Tintuc3Component
        },
        {
          path:'tintuc4',
          component: Tintuc4Component
        },
        {
          path:'finace',
          component: FinanceComponent
        },
        {
          path:'project',
          component: ProjectsComponent
        },
        {
          path: 'project/:id',
          component: ProjectDetailComponent
        },
        {
          path: 'profile',
          component: SettingComponent,
          canActivate: [ AuthenGuard ]
        },

        {
          path: 'donate',
          component: DonateComponent,
          children: [
            {
              path: 'personal',
              component: PersonalComponent
            },
            {
              path: 'business',
              component: BusinessesComponent
            }
          ]
        }

      ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class MainRouterModule {}
