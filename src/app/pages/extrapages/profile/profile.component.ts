import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {AuthService} from "../../../account/authentification/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})

// profile component
export class ProfileComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  user!:any;

  role!:any;

  constructor( private authService: AuthService) { }







  userConnectedString: string | null = localStorage.getItem('currentUser');
  userConnected: any = this.userConnectedString ? JSON.parse(this.userConnectedString) : null;
  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.role=this.userConnected.role[0];
    this.authService.loadUserByEmail(this.userConnected.email).subscribe(
      (data) => {
        this.user = data;
        console.log('User data:', data);
        // Handle the received user data here
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error here
      }
    );
    this.breadCrumbItems = [
      { label: 'Pages', active: true },
      { label: 'Profile', active: true }
    ];
  }

  // follow button toggle
  Followbtn(ev: any) {
    ev.target.closest('button').classList.toggle('active')
  }
}