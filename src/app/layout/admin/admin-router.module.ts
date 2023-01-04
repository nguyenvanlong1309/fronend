import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from './admin.layout';
import { UserComponent } from '../../components/admin/user/user.component';
import { DonateComponent } from '../../components/admin/donate/donate.component';
import { DbpComponent } from 'src/app/components/admin/dbp/dbp.component';
import { DashboardComponent } from 'src/app/components/admin/dashboard/dashboard.component';
import { BrowserPostComponent } from 'src/app/components/admin/browser-post/browser-post.component';
import { ProjectDetailComponent } from 'src/app/components/projects/detail/project-detail.component';

const routes: Routes = [
	{
		path: '',
		component: AdminLayoutComponent,
		children: [
			{
				path:'dbp',
				component: DbpComponent,
			},
			{
				path:'dbp1',
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
			{
				path: 'project/:id',
				component: ProjectDetailComponent
			  },
		]
	}
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class AdminRouterModule {}