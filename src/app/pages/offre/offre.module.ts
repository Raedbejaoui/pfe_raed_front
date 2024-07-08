import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MesOffresComponent } from './components/mes-offres/mes-offres.component';

// Modules ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';

// Autres modules
import { NgxSliderModule } from 'ngx-slider-v2';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from 'src/app/shared/shared.module';
import { OffreRoutingModule } from './offre-routing.module';
import { OffreClientComponent } from './components/offre-client/offre-client.component';
import { OffreAdminComponent } from './components/offre-admin/offre-admin.component';
import { OffreEntrepriseComponent } from './components/offre-entreprise/offre-entreprise.component';
import { DropzoneModule, DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { provideNgxMask } from 'ngx-mask';
import {DecimalPipe} from "@angular/common";

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post', // Changez ceci par votre URL de téléversement
  maxFilesize: 50, // Taille maximale des fichiers en Mo
  acceptedFiles: 'image/*' // Types de fichiers acceptés
};

@NgModule({
  declarations: [OffreClientComponent, OffreAdminComponent, OffreEntrepriseComponent, MesOffresComponent],
  imports: [
    CommonModule,
    SharedModule,
    OffreRoutingModule,
    FormsModule,



    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    SlickCarouselModule,
    NgApexchartsModule,
    NgxSliderModule,
    ReactiveFormsModule,
    CKEditorModule,
    LeafletModule,
    DropzoneModule
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    provideNgxMask(), // Fournisseur pour ngx-mask
    { // Fournisseur pour la configuration de ngx-dropzone-wrapper
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class OffreModule { }
