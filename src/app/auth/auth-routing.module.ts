import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './componants/register/register.component';
import { RequestResetPasswordComponent } from './componants/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './componants/reset-password/reset-password.component';
import { VerifyAccountComponent } from './componants/verify-account/verify-account.component';

const routes: Routes = [

  
  { path: '', component: AuthComponent },
  {path:'register',component:RegisterComponent},
  {path:'request-reset-password', component:RequestResetPasswordComponent },
  {path:'reset-password', component:ResetPasswordComponent },
  {path:'verify-account', component:VerifyAccountComponent },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
