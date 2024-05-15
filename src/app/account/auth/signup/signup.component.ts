import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../authentification/auth.service';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

// Signup Component
export class SignupComponent implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();
  fieldTextType!: boolean;


  signupForm!: FormGroup;


  /**
 * Password Hide/Show
 */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authEntreprise:AuthService
  ){

  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      domaine: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    
    });

    
  }

  signupEntreprise() {
    const formData = this.signupForm.value;
    this.authEntreprise.registerEntreprise(formData).subscribe({
      next: () => { 
        console.log('Enregistrement réussi');
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement :', err);
      }
    });
  }
  



}
