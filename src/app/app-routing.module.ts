import { NotfoundComponent } from './components/notfound/notfound.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/main/main.module').then(m => m.MainLayoutModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./layout/auth/auth.module').then(m => m.AuthLayoutModule)
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
