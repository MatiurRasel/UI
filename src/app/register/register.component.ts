import { Component } from '@angular/core';
import { 
  AbstractControl, 
  AbstractControlOptions, 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  ValidationErrors, 
  ValidatorFn, 
  Validators 
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 hide = true;
 responseMsg: string ='';
 registerForm: FormGroup;

 constructor(private fb: FormBuilder) {
   this.registerForm = fb.group(
    {
     firstName:fb.control('',[Validators.required]),
     lastName: fb.control('',[Validators.required]),
     email: fb.control('',[Validators.required,Validators.email]),
     password: fb.control('',[
       Validators.required,
       Validators.minLength(8),
       Validators.maxLength(15),
     ]),
     rpassword: fb.control(''),
   },
   {
     Validators: [repeatPasswordValidator],
   } as AbstractControlOptions
   );
 }

 register() {}
 
 getFirstNameErrors() {
   if(this.FirstName.hasError('required')) return 'Field is required!';
   return '';
 }
 
 getLastNameErrors() {
   if(this.LastName.hasError('required')) return 'Field is required!';
   return '';
 }
 getEmailErrors() {
   if(this.Email.hasError('required')) return 'Email is required!';
   if(this.Email.hasError('email')) return 'Email is required!';
   return '';
 }
 
 getPasswordErrors() {
   if(this.Password.hasError('required')) return 'Password is required!';
   if(this.Password.hasError('minlength')) return 'Minimum 8 characters are required!';
   if(this.Password.hasError('maxlength')) return 'Minimum 15 characters are required!';
   return '';
 }
 
 
 // getFirstNameErrors() {
 //   if(this.FirstName.hasError('required')) return 'Field is required!';
 //   if(this.FirstName.hasError('pattern')) return 'Should start with alphabet';
 //   return '';
 // }
 
 get FirstName(): FormControl {
   return this.registerForm.get('firstName') as FormControl;
 }
 get LastName(): FormControl {
   return this.registerForm.get('lastName') as FormControl;
 }
 get Email(): FormControl {
   return this.registerForm.get('email') as FormControl;
 }
 get Password(): FormControl {
   return this.registerForm.get('password') as FormControl;
 }
 get RPassword(): FormControl {
   return this.registerForm.get('rpassword') as FormControl;
 }
 }
 
 
 export const repeatPasswordValidator: ValidatorFn = (
 control: AbstractControl
 ): ValidationErrors | null =>{
 const pwd = control.get('password')?.value;
 const rpwd = control.get('rpassword')?.value;
 if(pwd === rpwd) {
   control.get('rpassword')?.setErrors(null);
   return null;
 }
 else{
   control.get('rpassword')?.setErrors({rpassword: true});
   return {
     rpassword:true
   };
 }
};