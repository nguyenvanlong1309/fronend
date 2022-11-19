import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { AdminRouterModule } from './admin-router.module';
import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from './admin.layout';
import { UserComponent } from '../../components/admin/user/user.component';
import { DonateComponent } from '../../components/admin/donate/donate.component';
import { AdminSidebarComponent } from './components/sidebar/admin-sidebar.component';
import { DbpComponent } from 'src/app/components/admin/dbp/dbp.component';
import { DashboardComponent } from 'src/app/components/admin/dashboard/dashboard.component';
import { BrowserPostComponent } from 'src/app/components/admin/browser-post/browser-post.component';
import { AdminHeaderComponent } from './components/header/admin-header.component';
import { DbpActionComponent } from 'src/app/components/admin/dbp/action/dbp-action.component';
import { ShowDetailComponent } from 'src/app/components/admin/user/show-detail/show-detail.component';
import { UserActionComponent } from 'src/app/components/admin/user/action/user-action.component';
import { CommentComponent } from 'src/app/components/admin/donate/comment/comment.component';
import { UserFormComponent } from 'src/app/components/admin/user/user-form/user-form.component';

const imports = [
    AdminRouterModule,
    CommonModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
]

const declarations = [
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminLayoutComponent,
    DbpComponent,
    UserComponent,
    DonateComponent,
    DashboardComponent,
    BrowserPostComponent,
    DbpActionComponent,
    ShowDetailComponent,
    UserActionComponent,
    CommentComponent,
    UserFormComponent
]

@NgModule({
    imports: imports,
    declarations: declarations
})
export class AdminModule {}