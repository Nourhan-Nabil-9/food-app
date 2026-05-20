import { Component, inject } from '@angular/core';
import { AdminRoutingModule } from "src/app/admin/admin-routing.module";
import { Roles } from 'src/app/roles';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';

interface IMenue{
title:string,
icon:string,
isActive:boolean,
navigationLink:string
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [AdminRoutingModule,CommonModule],
})
export class SidebarComponent {
private readonly authService=inject(AuthService)

onLogout(){
  this.authService.logOut();
}
  isAdmin():boolean{
    return localStorage.getItem('userRole')==Roles.SuperAdmin?true:false
  }
  isUser():boolean{
    return localStorage.getItem('userRole')==Roles.SystemUser?true:false
  }
menue:IMenue[]=[{

  title:'Home',
  icon:'fa-regular fa-house',
  navigationLink:'/dashboard/home',
  isActive:this.isAdmin()||this.isUser()
},
{
  title:'Users',
  icon:'fa-solid fa-users',
  navigationLink:'/dashboard/admin/users',
  isActive:this.isAdmin()
},
{
  title:'Recipes',
  icon:'fa-solid fa-border-all',
  navigationLink:this.isUser()?'/dashboard/user-portal/recipes':'/dashboard/admin/recipes',
  isActive:this.isUser()||this.isAdmin()
},{
  title:'Categories',
  icon:'fa-regular fa-calendar-days',
  navigationLink:'/dashboard/admin/categories',
  isActive:this.isAdmin()
},{
  title:'Change Password',
  icon:'fa-solid fa-unlock',
  navigationLink:'/dashboard/change-password',
  isActive:this.isAdmin()
},{
  title:'Logout',
  icon:'fa-solid fa-right-from-bracket',
  navigationLink:'/auth',
  isActive:this.isAdmin()
},{
  title:'Favorites',
  icon:'fa-regular fa-heart',
  navigationLink:'/dashboard/user-portal/favorites',
  isActive:this.isUser()
}

]

}
