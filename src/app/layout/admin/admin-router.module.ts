import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AdminComponent } from './admin.component';
import { DbpComponent } from './dbp/dbp.component';
import { UserComponent } from './user/user.component';
import { DonateComponent } from './donate/donate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserPostComponent } from './browser-post/browser-post.component';

const routes: Routes = [
    {
        path:'',
        component: AdminComponent,
      },
      {
        path:'dbp',
        component: DbpComponent,
      },
      {
        path:'user',
        component: UserComponent,
      },
      {
        path:'donate',
        component: DonateComponent,
      },
      {
        path:'dashboard',
        component: DashboardComponent,
      },
      {
        path:'browser-post',
        component: BrowserPostComponent,
      },
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class AdminRouterModule {}