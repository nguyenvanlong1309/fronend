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
import { ProjectsComponent } from 'src/app/components/projects/projects.component';
import { PostComponent } from 'src/app/components/post/post.component';

import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { PersonalComponent } from 'src/app/components/donate/personal/personal.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostFormComponent } from 'src/app/components/setting/post-form/post-form.component';
import { SelectComponent } from 'src/app/components/shared/select/select.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorComponent } from 'src/app/components/shared/editor/editor.component';
import { SafePipe } from 'src/app/pipe/safe.pipe';
import { ProjectDetailComponent } from 'src/app/components/projects/detail/project-detail.component';
import { MyProjectComponent } from 'src/app/components/setting/my-project/my-project.component';
import { AgGridModule } from 'ag-grid-angular';
import { MyProjectActionComponent } from 'src/app/components/setting/my-project/action/action.component';
import { MyDonateComponent } from 'src/app/components/setting/my-donate/my-donate.component';
import { BusinessesComponent } from 'src/app/components/donate/businesses/businesses.component';
import { DonateComponent } from 'src/app/components/donate/donate.component';

const imports:  Array<Type<any> | ModuleWithProviders<{}> | any[]> = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRouterModule,
    AngularEditorModule,
    AgGridModule,
]

const declarations: Array<Type<any> | any[]> = [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IntroduceComponent,
    NewsComponent,
    FinanceComponent,
    
    ProjectsComponent,
    PostComponent,
    SettingComponent,
    PostFormComponent,
    SelectComponent,
    EditorComponent,
    ProjectCardComponent,
    ProjectDetailComponent,
    MyProjectComponent,
    MyProjectActionComponent,
    MyDonateComponent,

    DonateComponent,
    PersonalComponent,
    BusinessesComponent,

    SafePipe,
    ImagePipe
]

@NgModule({
    imports: imports,
    declarations: declarations,
})
export class MainLayoutModule {

}
