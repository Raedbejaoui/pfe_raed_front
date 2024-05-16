import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirm-role',  
  templateUrl: './confirm-role.component.html',
  styleUrl: './confirm-role.component.scss'
})
export class ConfirmRoleComponent  {

  confirmRole!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}


  ngOnInit(): void {
    this.confirmRole = this.formBuilder.group({
      role:['', Validators.required],
    });
   
  }
  

  

  onSubmit() { 
    const roleData = this.confirmRole.get('role')?.value;
    console.log(roleData);
    if (roleData === 'client'  ) {
      this.router.navigate(['/account/register_Client']);
    } else if(roleData === 'entreprise') {
      this.router.navigate(['/account/register']);
    }
    else {
      console.error('Invalid role data:', roleData); 
    }
  }
  
}
