import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { LoginComponent } from 'src/app/layout/auth/components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path:'log-in',
        component: LoginComponent
      },
      {
        path:'sign-up',
        component: SignupComponent
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
        
    ]
})
export class AuthLayoutModule {}
