import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmRoleComponent } from './confirm-role/confirm-role.component';
import { RegisterClientComponent } from './register-client/register-client.component';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'register_Client',
    component:RegisterClientComponent
  },
  {
    path:'confirm_role',
    component:ConfirmRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
