import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent {
private readonly authService=inject(AuthService);
private readonly toastrService=inject(ToastrService);
private readonly router=inject(Router)
errorMesg:string='';

reqResPassForm=new FormGroup({
  email:new FormControl(null ,[Validators.email,Validators.required]),
})


onSubmit(data:FormGroup){
console.log(data.value);
this.authService.onReqResPass(data.value).subscribe({
  next:(res)=>{
  console.log(res);
  this.toastrService.success('Reset password email sent successfully', 'Success', {
    timeOut: 5000,
  });

  localStorage.setItem('email', this.reqResPassForm.value.email!)
  this.router.navigateByUrl('/auth/reset-password')
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
}
