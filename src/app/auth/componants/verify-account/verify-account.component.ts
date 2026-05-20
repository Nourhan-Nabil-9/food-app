import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent {

private readonly toastrService=inject(ToastrService);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router)
   verifyAccForm !:FormGroup;
  private readonly fb =inject(FormBuilder);


  errorMesg:string='';
  constructor(){
  this.createVerifyAcc();
  const savedemail=localStorage.getItem('email')
  if(savedemail){
    this.verifyAccForm.patchValue({
      emil:savedemail
    })
  }
  }
  createVerifyAcc(){
     this.verifyAccForm=this.fb.group({
       email:new FormControl( { value: localStorage.getItem('email'), disabled: true } ,[Validators.email,Validators.required]),
       code: new FormControl(null,[Validators.required]),
     } )
  }

  onSubmit(){
   this.authService.onVerifyAccount(this.verifyAccForm.getRawValue()).subscribe({
   next:(res)=>{
     console.log(res);
     this.toastrService.success('Your email is verified', 'Success', {
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

}
