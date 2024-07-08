import {Component, OnInit} from '@angular/core';
import {  FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthService } from '../authentification/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.scss'
})
export class RegisterClientComponent implements OnInit{

signupForm!: UntypedFormGroup;
submitted = false;
successmsg = false;
error = '';
// set the current year
year: number = new Date().getFullYear();

fieldTextType!: boolean;

constructor(
  private formBuilder: FormBuilder,
  private authEntreprise:AuthService,
  private router: Router,
) { }

ngOnInit(): void {

this.signupForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
  lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
  role: ['CLIENT', [Validators.required]],
});



}
  areAllFieldsEmpty(): boolean {
    const controls = this.signupForm.controls;
    return Object.keys(controls).every(key => !controls[key].value);
  }
  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

/**
 * Register submit form
 */
signupEntreprise() {
  const formData = this.signupForm.value;
  this.authEntreprise.registerClient(formData).subscribe({
    next: () => {
    //  this.router.navigate(['/account/login']);
    },
    error: (err) => {
      this.router.navigate(['/account/login']);
    }
  });
}






/**
* Password Hide/Show
*/
toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

}
