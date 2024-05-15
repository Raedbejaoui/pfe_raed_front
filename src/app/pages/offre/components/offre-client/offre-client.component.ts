import { OffreService } from './../../service/offre.service';
import { Component, ViewChild } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { AuthService } from 'src/app/account/authentification/auth.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-offre-client',
  templateUrl: './offre-client.component.html',
  styleUrl: './offre-client.component.scss'
})
export class OffreClientComponent {

  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;

   // dropzone
   public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  offreForm!:FormGroup
  userId: string|null=null;
  listOffres: any;

  constructor(
    private formBuilder :FormBuilder ,
    private authService:AuthService ,
    private offreService:OffreService 
  ){

  }

  ngOnInit(): void {
    this.authService.retrieveUserFromLocalStorage();
    this.userId=this.authService.getUserIdFromLocalStorage();
    this.findAll();
    this.offreForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      deadLine: ['', [Validators.required]],
      description: ['', [Validators.required]],
      offerStatus:['EN_COURS', [Validators.required]],
    });

  }


  SaveOffre() {  
    const offreData = this.offreForm.value;
    console.log('form data ', offreData);
  
    if (this.userId !== null && this.offreForm.valid) {
      this.offreService.addOffer(this.userId, offreData).subscribe(
        (data) => {
          console.log('Offre enregistrée avec succès : ', data); 
          this.findAll();
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de l\'enregistrement de l\'offre : ', error);
        }
      );
      this.showModal?.hide(); 
      this.offreForm.reset();
    } else {
    }
  }

  findAll(){
    this.offreService.getAllOffers().subscribe(
      (data) => {
        this.listOffres=data; 
        console.log(this.listOffres)
      }
    )
  }

  Delete(offreId:any) {
    this.offreService.deleteOffer(offreId).subscribe(
     (data) => {
       this.findAll();
     }

    )
  }
  
  



  








}
