import { Component } from '@angular/core';
import {  FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthService } from '../authentification/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

// Register Component
export class RegisterComponent {
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
      name: ['', Validators.required],
      domaine: ['', Validators.required],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      description: ['', [Validators.required]],
      site: ['', [Validators.required]],
      role: ['ENTREPRISE', [Validators.required]],
    
    });

  }

    // convenience getter for easy access to form fields
    get f() { return this.signupForm.controls; }

  /**
   * Register submit form
   */
  signupEntreprise() {
    const formData = this.signupForm.value;
    this.authEntreprise.registerEntreprise(formData).subscribe({
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
