import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
{path:'', redirectTo:'auth' ,pathMatch:'full'},
  { path: 'auth' ,loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, 
 { path: 'dashboard', canActivate:[authGuard] ,loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
{ path: 'admin', canActivate:[authGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
{ path: 'user-portal', canActivate:[authGuard], loadChildren: () => import('./user-portal/user-portal.module').then(m => m.UserPortalModule) },
// { path: 'change-password', canActivate:[authGuard], loadChildren: () => import('../app/shared/change-password/change-password.component').then(m => m.ChangePasswordComponent) },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
