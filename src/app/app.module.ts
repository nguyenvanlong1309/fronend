import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { IntroduceComponent } from './components/introduce/introduce.component';
import { NewsComponent } from './components/news/news.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FinanceComponent } from './components/finance/finance.component';

const routes : Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {
    path : 'home',
    component: HomeComponent
  },
  {
    path : 'introduce',
    component: IntroduceComponent
  },
  {
    path : 'finace',
    component: FinanceComponent
  },
  {
    path : 'log-in',
    component: LoginComponent
  },
  {
    path : 'sign-up',
    component: SignupComponent
  },
  {
    path : '**',
    component: NotfoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    IntroduceComponent,
    NewsComponent,
    LoginComponent,
    SignupComponent,
    FinanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
