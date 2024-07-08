import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// page route
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import {ElasticsearchComponent} from "./elasticsearch/elasticsearch.component";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {RecommondationComponent} from "./recommondation/recommondation.component";

@NgModule({
  declarations: [ElasticsearchComponent,],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    MatCardModule,
    CommonModule,

    MatGridListModule
  ]
})
export class PagesModule { }
