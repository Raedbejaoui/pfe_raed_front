import { Component } from '@angular/core';
import {  FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthService } from '../authentification/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.scss'
})
export class RegisterClientComponent {
// Login Form
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
    email: ['', [Validators.required]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    cin: ['', [Validators.required]],
    role: ['CLIENT', [Validators.required]],
  
  });

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
