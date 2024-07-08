import {Component, OnInit} from '@angular/core';
import {EntrepriseService} from "../../core/services/entreprise.service";
import {AuthService} from "../../account/authentification/auth.service";
import {FormBuilder} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
    standalone: true,
  selector: 'app-recommondation',
  imports: [ CommonModule,],
  templateUrl: './recommondation.component.html',
  styleUrl: './recommondation.component.scss'
})
export class RecommondationComponent implements OnInit{

  round(num: number): number {
    return Math.round(num);
  }
constructor(private entrepriseService: EntrepriseService ,private formBuilder: FormBuilder, private  authService: AuthService) { }
recommendedCompanies: any[] = [];

userConnectedString!: string;
userConnected: any;
ngOnInit(): void {
this.userConnectedString = localStorage.getItem('currentUser') || '';  if (this.userConnectedString) {
    this.userConnected = JSON.parse(this.userConnectedString);
    if (this.userConnected && this.userConnected.id) {
      this.entrepriseService.getRecommendedCompanies(this.userConnected.id).subscribe(
        (data) => {
          this.recommendedCompanies = data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('User ID is undefined');
    }
  } else {
    console.error('currentUser is not set in local storage');
  }
}

}
