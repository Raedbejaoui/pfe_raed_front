import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/account/authentification/auth.service';
import { OffreService } from './../../service/offre.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offre-client',
  templateUrl: './offre-client.component.html',
  styleUrls: ['./offre-client.component.scss']
})
export class OffreClientComponent implements OnInit, OnDestroy {
  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;
  offreForm!: FormGroup;
  userId: string | null = null;
  listOffres: any;
  offerSubscription: Subscription | undefined;
  uploadedFiles: any[] = [];
  uploadProgress: number = 0;
  uploadedImage: string | null = null;
  progressValue: number = 0;

  uploadedImageName: string | null = null;
  uploadedImageSize: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private offreService: OffreService
  ) {}

  ngOnInit(): void {
    this.authService.retrieveUserFromLocalStorage();
    this.userId = this.authService.getUserIdFromLocalStorage();
    this.findAll();
    this.offreForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      deadLine: ['', [Validators.required]],
      image: [null, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }
  }

  SaveOffre(): void {
    const formData = new FormData();
    formData.append('title', this.offreForm.get('title')!.value);
    formData.append('description', this.offreForm.get('description')!.value);
    formData.append('deadLine', this.offreForm.get('deadLine')!.value);
    formData.append('image', this.offreForm.get('image')!.value);

    if (this.userId !== null && this.offreForm.valid) {
      this.offerSubscription = this.offreService.addOffer(this.userId, formData).subscribe({
        next: (data) => {
          console.log('Offre enregistrée avec succès : ', data);
          this.findAll();
          this.showModal?.hide();
          this.offreForm.reset();
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de l\'enregistrement de l\'offre : ', error);
        }
      });
    }
  }

  findAll(): void {
    this.offerSubscription = this.offreService.getAllOffers().subscribe({
      next: (data) => {
        this.listOffres = data.map((offre: any) => ({
          ...offre,
          replyCount: offre.replies ? offre.replies.length : 0
        }));
        console.log(this.listOffres);
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des offres : ', error);
      }
    });
  }

  Delete(offreId: any): void {
    this.offerSubscription = this.offreService.deleteOffer(offreId).subscribe({
      next: (data) => {
        this.findAll();
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'offre : ', error);
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.offreForm.get('image')!.setValue(file);
      this.uploadProgress = 50;
      setTimeout(() => {
        this.uploadProgress = 100;
        this.uploadedImage = URL.createObjectURL(file);
      }, 1000);

      if (file) {
        this.uploadedImage = file;
        this.uploadedImageName = file.name;
        this.uploadedImageSize = file.size;
      }
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  }

  removeUploadedImage(): void {
    this.uploadedImage = null;
  }
}
