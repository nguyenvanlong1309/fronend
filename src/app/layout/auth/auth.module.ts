import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { LoginComponent } from 'src/app/layout/auth/components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { DbpComponent } from './components/admin/dbp/dbp.component';
import { UserComponent } from './components/admin/user/user.component';
import { DonateComponent } from './components/admin/donate/donate.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { BrowserPostComponent } from './components/admin/browser-post/browser-post.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenGuard } from 'src/app/guards/authen.guard';

const routes: Routes = [
    {
        path:'log-in',
        component: LoginComponent
      },
      {
        path:'sign-up',
        component: SignupComponent
      },
      {
        path:'admin',
        component: AdminComponent,
        canActivate: [ AuthenGuard ]
      },
      {
        path:'dbp',
        component: DbpComponent,
        canActivate: [ AuthenGuard ]
      },
      {
        path:'user',
        component: UserComponent,
        canActivate: [ AuthenGuard ]
      },
      {
        path:'donate',
        component: DonateComponent,
        canActivate: [ AuthenGuard ]
      },
      {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthenGuard ]
      },
      {
        path:'browser-post',
        component: BrowserPostComponent,
        canActivate: [ AuthenGuard ]
      },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LoginComponent,
        SignupComponent,
        AdminComponent,
        DbpComponent,
        UserComponent,
        DonateComponent,
        DashboardComponent,
        BrowserPostComponent
    ]
})
export class AuthLayoutModule {}
