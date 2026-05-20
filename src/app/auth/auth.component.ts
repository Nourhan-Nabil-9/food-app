import { VerifyAccountComponent } from './componants/verify-account/verify-account.component';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
private readonly authService=inject(AuthService);
private readonly toastrService=inject(ToastrService);
private readonly router=inject(Router)
errorMesg:string='';

loginForm=new FormGroup({
  email:new FormControl(null ,[Validators.email,Validators.required]),
  password :new FormControl(null ,[Validators.required ,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ])
})


onSubmit(data:FormGroup){
console.log(data.value);
this.authService.onLogin(data.value).subscribe({
  next:(res)=>{
console.log(res);

localStorage.setItem('userToken',res.token); 

//jwt decode
this.authService.getProfile();
 this.toastrService.success('You are logged in', 'Login', {
        timeOut: 5000,
      });

      this.router.navigateByUrl('/dashboard');
  },
  error:(err)=>{
    console.log(err);
     this.errorMesg=err.error.message;
     console.log(this.errorMesg);
     this.toastrService.error(this.errorMesg, 'Error!', {
  timeOut: 5000,
});
    
  },
  complete:()=>{
  
  }
})
}


showPassword=false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }



}
