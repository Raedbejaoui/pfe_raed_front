import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffreClientComponent } from './components/offre-client/offre-client.component';
import { OffreEntrepriseComponent } from './components/offre-entreprise/offre-entreprise.component';
import { OffreAdminComponent } from './components/offre-admin/offre-admin.component';
import {OffreDetailsComponent} from "./components/offre-details/offre-details.component";

const routes: Routes = [
  {
    path:'offre_client' ,
    component:OffreClientComponent
  } ,
  {
    path:'offre_entreprise',
    component:OffreEntrepriseComponent
  } ,
  {
    path:'offre_admin',
    component:OffreAdminComponent
  },
  {
   path: 'offre_details/:id',
    component : OffreDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreRoutingModule { }
