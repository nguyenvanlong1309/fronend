import { HomeComponent } from './components/home/home.component';
import { IntroduceComponent } from './components/introduce/introduce.component';
import { NewsComponent } from './components/news/news.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FinanceComponent } from './components/finance/finance.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    path:'log-in',
    component: LoginComponent
  },
  {
    path:'sign-up',
    component: SignupComponent
  },

  {
    // khi một router nào được gọi mà không có trong phần appRouter thì NotFoundComponent được gọi ra
    path : '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
