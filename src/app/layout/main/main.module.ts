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
import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { DonateComponent } from 'src/app/components/donate/donate.component';
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
          path:'donate',
          component: DonateComponent
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
          path: 'profile',
          component: SettingComponent,
          canActivate: [ AuthenGuard ]
        }
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
    DonateComponent,
    PersonalComponent,
    BusinessesComponent,
    ProjectsComponent,
    SettingComponent
]

@NgModule({
    imports: imports,
    declarations: declarations
})
export class MainLayoutModule {

}
