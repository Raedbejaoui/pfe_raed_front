import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

// Page Route
import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';

// Component
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmRoleComponent } from './confirm-role/confirm-role.component';
import { RegisterClientComponent } from './register-client/register-client.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmRoleComponent,
    RegisterClientComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AccountModule { }
