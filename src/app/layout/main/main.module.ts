import { BankComponent } from './../../components/donate/bank/bank.component';
import { MapComponent } from './../../components/map/map.component';
import { ProjectCardComponent } from './../../components/projects/project-card/project-card.component';
import { ImagePipe } from './../../pipe/image.pipe';
import { MainRouterModule } from './main-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingComponent } from './../../components/setting/setting.component';
import { MainLayoutComponent } from './main.layout';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ModuleWithProviders, NgModule, Type } from "@angular/core";
import { HomeComponent } from 'src/app/components/home/home.component';
import { IntroduceComponent } from 'src/app/components/introduce/introduce.component';

import { NewsComponent } from 'src/app/components/news/news.component';
import { Tintuc1Component } from 'src/app/components/news/tintuc1/tintuc1.component';
import { Tintuc2Component } from 'src/app/components/news/tintuc2/tintuc2.component';

import { ProjectsComponent } from 'src/app/components/projects/projects.component';

import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { PersonalComponent } from 'src/app/components/donate/personal/personal.component';
import { FooterComponent } from './components/footer/footer.component';

import { ProjectDetailComponent } from 'src/app/components/projects/detail/project-detail.component';
import { MyProjectComponent } from 'src/app/components/setting/my-project/my-project.component';
import { AgGridModule } from 'ag-grid-angular';
import { MyProjectActionComponent } from 'src/app/components/setting/my-project/action/action.component';
import { MyDonateComponent } from 'src/app/components/setting/my-donate/my-donate.component';
import { BusinessesComponent } from 'src/app/components/donate/businesses/businesses.component';
import { DonateComponent } from 'src/app/components/donate/donate.component';
import { ListDonateComponent } from 'src/app/components/donate/list-donate/list-donate.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

const imports:  Array<Type<any> | ModuleWithProviders<{}> | any[]> = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRouterModule,
    AgGridModule,
    SharedModule,
]

const declarations: Array<Type<any> | any[]> = [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IntroduceComponent,

    NewsComponent,
    Tintuc1Component,
    Tintuc2Component,

    FinanceComponent,
    ProjectsComponent,
    SettingComponent,
    ProjectCardComponent,
    ProjectDetailComponent,
    MyProjectComponent,
    MyProjectActionComponent,
    MyDonateComponent,

    DonateComponent,
    PersonalComponent,
    BusinessesComponent,

    MapComponent,

    BankComponent,
    ListDonateComponent,

    ImagePipe
]

@NgModule({
    imports: imports,
    declarations: declarations,
})
export class MainLayoutModule {

}
