import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {AuthService} from "../../../account/authentification/auth.service";
import { latLng, tileLayer } from 'leaflet';
import {UserProfileService} from "../../../core/services/user.service";
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  providers: [FormsModule]
})


export class ProfileSettingsComponent {

  showMap = false;
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'markersLayers' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  onMapClick(e: any) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    this.userForm.patchValue({ adresse: `Lat: ${lat}, Lng: ${lng}` });
  }
  breadCrumbItems!: Array<{}>;
  fieldTextType!: boolean;
  fieldTextType1!: boolean;
  fieldTextType2!: boolean;
  bsConfig?: Partial<BsDatepickerConfig>;

  formGroups: FormGroup[] = [];
  educationForm!: FormGroup;
  currentTab = 'personalDetails';
  user: any = {};
  email!:any;
  userForm!: FormGroup;
  SignUpEntreprise!:any;
  SignUpClient!:any;
  domains: string[] = [];
  role!:any;

  constructor( private userService: UserProfileService,private authService: AuthService,private formBuilder: FormBuilder) { }
  userConnectedString: string | null = localStorage.getItem('currentUser');
  userConnected: any = this.userConnectedString ? JSON.parse(this.userConnectedString) : null;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phone: [''],
      email: [''],
      name: [''],
      imageProfile: [''],
      domaine: [this.user?.domaine || ''],
      description: [''],
      cin: [''],
      adresse: [''],




    });

    /**
     * BreadCrumb
     */

this.userService.getAllDomains().subscribe(
  (data) => {
    // Éliminez les domaines vides
    const nonEmptyDomains = data.filter(domain => domain && domain.trim() !== '');

    // Éliminez les doublons
    this.domains = nonEmptyDomains.filter((domain, index, self) =>
      index === self.findIndex((d) => (
        d === domain
      ))
    );
  },
  (error) => {
    console.error('Error:', error);
  }
);
    this.email=this.userConnected.email;
    this.role=this.userConnected.role[0];
    this.authService.loadUserByEmail(this.userConnected.email).subscribe(
      (data) => {
        this.user = data;
        this.userForm.patchValue(this.user);
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
      { label: 'Profile Settings', active: true }
    ];

    this.educationForm = this.formBuilder.group({
      degree: [''],
      name: [''],
      year: [''],
      to: [''],
      description: ['']
    });
    this.formGroups.push(this.educationForm);

  }


  updateUserBasedOnRole(): void {
   const  user = this.userForm.value;
   this.user.domaine = user.domaine;
    user.imageProfile = this.userConnected.imageProfile; // Add the base64 string to the user object


    if (this.role == 'ROLE_CLIENT') {
    this.authService.updateUser(this.userConnected.email,user).subscribe(
      (data) => {
        console.log('User updated:', data);
        location.reload();
        // Handle the updated user data here
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error here
      }
    );
  } else if (this.role == 'ROLE_ADMIN') {
    this.authService.updateAdmin(this.userConnected.email,user).subscribe(
      (data) => {
        console.log('Admin updated:', data);
        location.reload();
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error here
      }
    );

  }
    else if (this.role == 'ROLE_ENTREPRISE') {
      this.authService.updateEntreprise(this.userConnected.email, user).subscribe(
        (data) => {
          console.log('User updated:', data);
          location.reload();
          // Handle the updated user data here
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error here
        }

    );

  }
}


  imageURL: any;
fileChange(event: any, id: any) {
  let fileList: any = (event.target as HTMLInputElement);
  let file: File = fileList.files[0];
  if (id == '1') { // If the user is updating the profile picture
    this.authService.uploadImageProfile(this.userConnected.email, file).subscribe(
      (data) => {
        console.log('User updated:', data);
        // Handle the updated user data here
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error here
      }
    );
  }
}

  /**
  * Default Select2
  */
  selectedAccount = 'This is a placeholder';
  Skills = [
    { name: 'Illustrator' },
    { name: 'Photoshop' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Javascript' },
    { name: 'Python' },
    { name: 'PHP' },
  ];

  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }


  /**
  * Password Hide/Show
  */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

   // add Form
   addForm() {
    const formGroupClone = this.formBuilder.group(this.educationForm.value);
    this.formGroups.push(formGroupClone);
  }

  // Delete Form
  deleteForm(id: any) {
    this.formGroups.splice(id, 1)
  }

}
