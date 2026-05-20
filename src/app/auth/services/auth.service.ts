import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../models/auth';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly httpClient =inject(HttpClient);
private readonly router =inject(Router)
  


getProfile(){
  const token:any=localStorage.getItem('userToken');
  const decoded:any =jwtDecode(token);
  console.log(decoded);

  localStorage.setItem('userRole',decoded.userGroup)
  localStorage.setItem('userName',decoded.userName)
  
}
logOut(){
  localStorage.removeItem('userToken');
this.router.navigate(['/auth'])
}
  onLogin(data:ILogin):Observable<any>{
   return this.httpClient.post('users/login',data)
  }
  onRegister(data:FormData):Observable<any>{
    return this.httpClient.post('users/register', data)
  }
  onReqResPass(data:{ email: string }):Observable<any>{
    return this.httpClient.post('users/reset/request',data)
  }
  onResetPassword(data:any):Observable<any>{
return this.httpClient.post('users/reset',data)
  }

  onVerifyAccount(data:any):Observable<any>{
return this.httpClient.put('users/verify',data)
  }

 onChangePass(data:FormData):Observable<any>{
return this.httpClient.put('users/ChangePassword',data)
  }
}
