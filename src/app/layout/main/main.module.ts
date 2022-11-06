import { MainLayoutComponent } from './main.layout';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ModuleWithProviders, NgModule, Type } from "@angular/core";
import { HomeComponent } from 'src/app/components/home/home.component';
import { IntroduceComponent } from 'src/app/components/introduce/introduce.component';
import { NewsComponent } from 'src/app/components/news/news.component';
import { FinanceComponent } from 'src/app/components/finance/finance.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
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
      ]
    }
]

const imports:  Array<Type<any> | ModuleWithProviders<{}> | any[]> = [
    CommonModule,
    RouterModule.forChild(routes),
]

const declarations: Array<Type<any> | any[]> = [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IntroduceComponent,
    NewsComponent,
    FinanceComponent
]

@NgModule({
    imports: imports,
    declarations: declarations
})
export class MainLayoutModule {

}