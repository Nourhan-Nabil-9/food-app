import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Roles } from 'src/app/roles';

export const adminGuard: CanActivateFn = (route, state) => {
const router=inject(Router)
  if(localStorage.getItem('userRole')===Roles.SuperAdmin){
return true;

  }else{
router.navigate(['/dashboard'])
return false
  }

  
};
