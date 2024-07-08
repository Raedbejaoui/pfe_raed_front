import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Page Route
import { ExtrapagesRoutingModule } from './extraspages-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// Component
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

@NgModule({
  declarations: [
    MaintenanceComponent,
    ComingSoonComponent
    // Removed ProfileSettingsComponent from here
  ],
  imports: [
    CommonModule,
    ExtrapagesRoutingModule,
    LeafletModule
  ]
})
export class ExtraspagesModule { }
