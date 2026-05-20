import { Component } from '@angular/core';
import { Roles } from 'src/app/roles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 userName:string|null='';
 constructor(){
 this.userName=localStorage.getItem('userName')
 }
getUserRecipesLink(): string {
  const role = localStorage.getItem('userRole'); 
  
  if (role === 'Admin') {
    return '/dashboard/admin/recipes';
  } else {
    return '/dashboard/user-portal/recipes';
  }
}

}
