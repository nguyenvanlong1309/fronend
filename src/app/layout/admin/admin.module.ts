import { CommonModule } from '@angular/common';
import { AdminRouterModule } from './admin-router.module';
import { NgModule } from "@angular/core";
import { AdminComponent } from './admin.component';
import { DbpComponent } from './dbp/dbp.component';
import { UserComponent } from './user/user.component';
import { DonateComponent } from './donate/donate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserPostComponent } from './browser-post/browser-post.component';

const imports = [
    AdminRouterModule,
    CommonModule
]

const declarations = [
    AdminComponent,
    DbpComponent,
    UserComponent,
    DonateComponent,
    DashboardComponent,
    BrowserPostComponent
]

@NgModule({
    imports: imports,
    declarations: declarations
})
export class AdminModule {}