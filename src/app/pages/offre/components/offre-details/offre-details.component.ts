import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { details, reviews } from '../../../ecommerce/product-details/data';
import { reviewsModel } from '../../../ecommerce/product-details/product-details.model';
import {FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { OffreService } from '../../service/offre.service';
import { AuthService } from '../../../../account/authentification/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RatingModule } from 'ngx-bootstrap/rating';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import {SimplebarAngularModule} from "simplebar-angular";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
  selector: 'app-offre-details',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    SlickCarouselModule,
    SharedModule,
    SimplebarAngularModule,
    DropzoneModule,
    RatingModule,
    RatingModule,
    DropzoneModule
  ],
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.scss']
})
export class OffreDetailsComponent implements OnInit {
  offerId!: string;
  currentUserId: string | null = null;
  offerDetails!: any;
  breadCrumbItems!: Array<{}>;
  reviewForm!: UntypedFormGroup;
  productdetail: any;
  reviewData!: reviewsModel[];
  submitted: boolean = false;
  deleteId: any;

  files: File[] = [];
  @ViewChild('addReview', { static: false }) addReview?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  @ViewChild('editOfferModalTemplate') editOfferModalTemplate!: TemplateRef<any>;
  editModalRef?: BsModalRef;
  editedOffer: any;


  constructor(
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private offreService: OffreService,
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.offerId = params['id'];
    });

    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Product Overview', active: true }
    ];
    this.getOfferDetails();
    this.editedOffer = this.offerDetails;
    this.authService.retrieveUserFromLocalStorage();
    this.currentUserId = this.authService.getUserIdFromLocalStorage();
    console.log(this.currentUserId);

    this.reviewForm = this.formBuilder.group({
      _id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      img: ['']
    });

    this.productdetail = details;
    this.reviewData = reviews.reverse();
  }

  slideConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  slidesConfig = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  slickChange(event: any) {
    const swiper = document.querySelectorAll('.swiperlist');
  }

  slidePreview(id: any, event: any) {
    const swiper = document.querySelectorAll('.swiperlist');
    swiper.forEach((el: any) => {
      el.classList.remove('swiper-slide-thumb-active');
    });
    event.target.closest('.swiperlist').classList.add('swiper-slide-thumb-active');
    this.slickModal.slickGoTo(id);
  }

  dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  uploadedFiles: any[] = [];

  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.reviewForm.controls['img'].setValue(this.uploadedFiles.map(file => file.dataURL));
    }, 0);
  }

  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  editReview(id: any) {
    this.uploadedFiles = [];
    this.addReview?.show();
    const review = this.reviewData[id];
    this.reviewForm.patchValue({
      _id: review.id,
      title: review.title,
      rate: review.rating,
      content: review.content,
      img: review.profile
    });
    this.uploadedFiles = review.profile;
  }

  saveReview() {
    if (this.reviewForm.valid) {
      const formValue = this.reviewForm.value;
      if (formValue._id) {
        this.reviewData = this.reviewData.map(review =>
          review.id === formValue._id ? { ...review, ...formValue } : review
        );
      } else {
        const newReview = {
          ...formValue,
          id: this.reviewData.length + 1,
          date: '',
          user: '',
          profile: this.uploadedFiles
        };
        this.reviewData.push(newReview);
      }
      this.addReview?.hide();
      this.reviewForm.reset();
      this.uploadedFiles = [];
    }
    this.submitted = true;
  }

  removeReview(id: any) {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  DeleteReview() {
    this.reviewData.splice(this.deleteId, 1);
    this.removeItemModal?.hide();
  }

  getOfferDetails() {
    this.offreService.getOfferById(this.offerId).subscribe(
      (offerDetails: any) => {
        this.offerDetails = offerDetails;
        console.log("Offer details : ", offerDetails);
      },
      (error: any) => {
        console.error("Error fetching offer details", error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  }

  isCurrentUserOwner(): boolean {
    return this.offerDetails && this.currentUserId && this.offerDetails.user.id === this.currentUserId;
  }

  editProduct() {
    if (this.isCurrentUserOwner()) {
      this.router.navigate(['/edit-product', this.offerId]);
    } else {
      console.error("Unauthorized attempt to edit product");
    }
  }

  confirmDelete() {
    if (this.isCurrentUserOwner()) {
      this.removeItemModal?.show();
    } else {
      console.error("Unauthorized attempt to delete product");
    }
  }

  deleteProduct() {
    if (this.isCurrentUserOwner()) {
      this.offreService.deleteOffer(this.offerId).subscribe(
        (response: any) => {
          console.log("Product deleted successfully", response);
          this.router.navigate(['/offres/offre_client']);
        },
        (error: any) => {
          console.error("Error deleting product", error);
        }
      );
      this.removeItemModal?.hide();
    } else {
      console.error("Unauthorized attempt to delete product");
    }
  }

  editOffer(offer: any) {
    this.editedOffer = { ...offer };
    this.editModalRef = this.modalService.show(this.editOfferModalTemplate);
  }

  saveEditedOffer() {
    // Call your service to save the edited offer
    this.offreService.updateOffer(this.offerId, this.editedOffer).subscribe(
      (response: any) => {
        location.reload();
        console.log("Offer edited successfully", response);
        this.editModalRef?.hide();
      },
      (error: any) => {
        console.error("Error editing offer", error);
      }
    );
    console.log("Offer edited successfully", this.editedOffer);
    this.editModalRef?.hide();
  }
}
