import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSliderModule } from 'ngx-slider-v2';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

// Leaflet Map
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// Bootstrap Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { OffreRoutingModule } from './offre-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OffreClientComponent } from './components/offre-client/offre-client.component';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { OffreAdminComponent } from './components/offre-admin/offre-admin.component';
import { OffreEntrepriseComponent } from './components/offre-entreprise/offre-entreprise.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


@NgModule({
  declarations: [OffreClientComponent , OffreAdminComponent , OffreEntrepriseComponent],
  imports: [
    CommonModule,
    SharedModule,
    OffreRoutingModule ,
    BsDropdownModule.forRoot(),  
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    SlickCarouselModule,
    TooltipModule.forRoot(),
    NgApexchartsModule,
   
    AlertModule.forRoot(),
   
    NgxSliderModule,
    CKEditorModule,
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    LeafletModule,
    RatingModule.forRoot(),
    DropzoneModule,

    
  
  ]
})
export class OffreModule { }
