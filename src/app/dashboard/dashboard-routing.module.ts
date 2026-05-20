import { userPorterGuard } from './../core/guards/user-porter.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../core/guards/admin.guard';
import { HomeComponent } from '../shared/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },

      
      
      {
        path: 'admin', canActivate: [adminGuard],
        loadChildren: () =>
          import('../admin/admin.module').then(m => m.AdminModule),
      },
      {
        path: 'user-portal', canActivate: [userPorterGuard],
        loadChildren: () =>
          import('../user-portal/user-portal.module').then(m => m.UserPortalModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
