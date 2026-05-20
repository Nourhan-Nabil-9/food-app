import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { NavbarComponent } from "../shared/navbar/navbar.component";


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SidebarComponent,
    NavbarComponent
]
})
export class AdminModule { }
