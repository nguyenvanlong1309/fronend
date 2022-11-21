import { AuthorGuard } from './guards/author.guard';
import { AuthenGuard } from './guards/authen.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './base/role.enum';

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
    path: 'admin',
    loadChildren: () => import('./layout/admin/admin.module').then(m => m.AdminModule),
    data: {
      roles: [Role.ADMIN]
    },
    canActivate: [ AuthenGuard, AuthorGuard ]
  },

  {
    path : '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
