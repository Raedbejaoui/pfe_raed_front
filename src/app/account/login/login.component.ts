import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { login } from 'src/app/store/Authentication/authentication.actions';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// Login Component
export class LoginComponent {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  a: any = 10;
  b: any = 20;
  toast!: false;
   userConnected:any ;
  // set the current year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authEntreprise:AuthService,
    private router: Router,
    private store: Store,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    const loginData = this.loginForm.value ;
    this.authEntreprise.login(loginData).subscribe({
      next: (data) => {
      console.log(data);
      this.userConnected=data ;
        if(this.userConnected.role [0]== 'ROLE_ENTREPRISE') {
          localStorage.setItem('currentUser', JSON.stringify(this.userConnected));
          this.router.navigate(['/offres/offre_entreprise']);
        }else if (this.userConnected.role[0] == 'ROLE_CLIENT') {
          localStorage.setItem('currentUser', JSON.stringify(this.userConnected));
          this.router.navigate(['/offres/offre_client']);
        }else if(this.userConnected.role[0] == 'ROLE_ADMIN'){
          localStorage.setItem('currentUser', JSON.stringify(this.userConnected));
          this.router.navigate(['/offres/offre_admin']);
        }
      },
      error: (err) => {
        console.log("error d'authentification user ")
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
