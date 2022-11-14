import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingComponent } from './../../components/setting/setting.component';
import { MainLayoutComponent } from './main.layout';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ModuleWithProviders, NgModule, Type } from "@angular/core";
import { HomeComponent } from 'src/app/components/home/home.component';
import { IntroduceComponent } from 'src/app/components/introduce/introduce.component';
import { NewsComponent } from 'src/app/components/news/news.component';
import { ProjectsComponent } from 'src/app/components/projects/projects.component';
import { Project1Component } from 'src/app/components/projects/project1/project1.component';
import { Project2Component } from 'src/app/components/projects/project2/project2.component';
import { Project3Component } from 'src/app/components/projects/project3/project3.component';
import { PostComponent } from 'src/app/components/post/post.component';

import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { PersonalComponent } from 'src/app/components/personal/personal.component';
import { BusinessesComponent } from 'src/app/components/businesses/businesses.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthenGuard } from 'src/app/guards/authen.guard';


const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path:'',
          component: HomeComponent
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
          path:'finace',
          component: FinanceComponent
        },
        {
          path:'project',
          component: ProjectsComponent
        },

        {
          path:'du-an-xay-dung-truong-tai-ban-lang-dan-toc',
          component: Project1Component
        },

        {
          path:'du-an-xay-lop-hoc-tinh-thuong',
          component: Project2Component
        },

        {
          path:'du-an-bua-sang-cho-em-toi-truong',
          component: Project3Component
        },

        {
          path:'donate-businesses',
          component: BusinessesComponent
        },

        {
          path:'donate-personal',
          component: PersonalComponent
        },

        {
          path:'post',
          component: PostComponent
        },

        {
          path: 'profile',
          component: SettingComponent,
          // canActivate: [ AuthenGuard ]
        },

      ]
    }
]

const imports:  Array<Type<any> | ModuleWithProviders<{}> | any[]> = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
]

const declarations: Array<Type<any> | any[]> = [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IntroduceComponent,
    NewsComponent,
    FinanceComponent,
    PersonalComponent,
    BusinessesComponent,
    ProjectsComponent,
    Project1Component,
    Project2Component,
    Project3Component,
    PostComponent,
    SettingComponent,

]

@NgModule({
    imports: imports,
    declarations: declarations
})
export class MainLayoutModule {

}
