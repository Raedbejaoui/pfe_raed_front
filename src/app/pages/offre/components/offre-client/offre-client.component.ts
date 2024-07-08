import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/account/authentification/auth.service';
import { OffreService } from './../../service/offre.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

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
    private datePipe: DatePipe,
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
  deadline: ['', [Validators.required]],
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

  // Convert the deadline value to a Date object
  const deadline = new Date(this.offreForm.get('deadline')!.value);
  const formattedDeadline = this.datePipe.transform(deadline, 'yyyy-MM-dd');
  formData.append('deadline', formattedDeadline!);

  this.uploadedFiles.forEach((uploadedFile, index) => {
    formData.append('images', uploadedFile.file, `image${index}`);
  });

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
  if (event.target.files && event.target.files.length > 0) {
    this.uploadedFiles = Array.from(event.target.files as File[]).map((file: File) => {
      return {
        file,
        url: URL.createObjectURL(file)
      };
    });
    this.offreForm.get('image')!.setValue(this.uploadedFiles);
    this.uploadProgress = 50;
    setTimeout(() => {
      this.uploadProgress = 100;
    }, 1000);
  }
}

removeUploadedImage(uploadedFile: { file: File; url: string; }): void {
  const index = this.uploadedFiles.indexOf(uploadedFile);
  if (index > -1) {
    this.uploadedFiles.splice(index, 1);
  }
}
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  }
}
