import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './componants/register/register.component';
import { RequestResetPasswordComponent } from './componants/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './componants/reset-password/reset-password.component';
import { VerifyAccountComponent } from './componants/verify-account/verify-account.component' ;

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    RequestResetPasswordComponent,
    ResetPasswordComponent,
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
