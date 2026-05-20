import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

private readonly authService=inject(AuthService);
private readonly toastrService=inject(ToastrService);
private readonly router =inject(Router);

errorMesg:string='';

registerForm=new FormGroup({
  userName:new FormControl(null,[Validators.required ,Validators.minLength(3)]),
  email:new FormControl(null ,[Validators.email,Validators.required]),
  country :new FormControl(null,[Validators.required]),
  phoneNumber :new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
profileImage:new FormControl(),
  password :new FormControl(null ,[Validators.required ,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ]),
  confirmPassword :new FormControl(null,[Validators.required])

},{ validators: this.checkPassword })


onSubmit(data:FormGroup){
console.log(data.value);

const myData=new FormData();
myData.append('userName',data.value.userName)
myData.append('email',data.value.email)
myData.append('country',data.value.country)
myData.append('phoneNumber',data.value.phoneNumber)
if(data.value.profileImage){
myData.append('profileImage',data.value.profileImage)}
myData.append('password',data.value.password)
myData.append('confirmPassword',data.value.confirmPassword)

this.authService.onRegister(myData).subscribe({
  next:(res)=>{
console.log(res);

localStorage.setItem('email',data.value.email); 

this.toastrService.success("Account created successfully" , "Register", {
  timeOut: 5000,
});
    this.router.navigateByUrl('/auth/verify-account');
  },
  error:(err)=>{
    console.log(err);
     this.errorMesg=err.error.message;
     console.log(this.errorMesg);
     this.toastrService.error(this.errorMesg, 'Error!', {
  timeOut: 5000,
});
    
  },

})
}
onFileSelected(event:any){
const file = event.target.files[0];
  if (file) {
    this.registerForm.patchValue({ profileImage: file });
    this.registerForm.get('profileImage')?.updateValueAndValidity();
  }
}
checkPassword(s:AbstractControl){
   const password = s.get('password')?.value 
   const confirmPassword = s.get('confirmPassword')?.value 
    return password===confirmPassword?null:{mismatch:true}
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
