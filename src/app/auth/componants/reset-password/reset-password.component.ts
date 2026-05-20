import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
 
})
export class ResetPasswordComponent {
  private readonly toastrService=inject(ToastrService);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router)
   resPassForm !:FormGroup;
  private readonly fb =inject(FormBuilder);


  errorMesg:string='';
  constructor(){
  this.createResPass();
  const savedEmail=localStorage.getItem('email');
  if(savedEmail){
    this.resPassForm.patchValue({
      emil:savedEmail
    })
  }
  }
  createResPass(){
     this.resPassForm=this.fb.group({
       email:new FormControl( { value: localStorage.getItem('email'), disabled: true } ,[Validators.email,Validators.required]),
       seed: new FormControl(null,[Validators.required]),
        password :new FormControl(null ,[Validators.required ,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ]),
        confirmPassword :new FormControl(null,[Validators.required])

     } ,{ validators: this.checkPassword })
  }

  checkPassword=(s:AbstractControl)=>{
   const password = s.get('password')?.value 
   const confirmPassword = s.get('confirmPassword')?.value 
    return password===confirmPassword?null:{mismatch:true}
  }

  onSubmit(){
  this.authService.onResetPassword(this.resPassForm.getRawValue()).subscribe({
   next:(res)=>{
     console.log(res);
     this.toastrService.success('Password has been updated successfully', 'Success', {
  timeOut: 5000,
});
  this.router.navigateByUrl('/auth');
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
showConfirmPassword=false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(){
this.showConfirmPassword= !this.showConfirmPassword
  }
}
