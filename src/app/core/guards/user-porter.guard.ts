import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Roles } from 'src/app/roles';

export const userPorterGuard: CanActivateFn = (route, state) => {
 const roter=inject(Router)
   if(localStorage.getItem('userRole')===Roles.SystemUser){
 
 return true
   }else{
 roter.navigate(['/dashboard'])
 return false
   }
 
};
