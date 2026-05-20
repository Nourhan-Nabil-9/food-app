
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { NavbarComponent } from "../shared/navbar/navbar.component";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarComponent,
    NavbarComponent
]
})
export class DashboardModule { }
