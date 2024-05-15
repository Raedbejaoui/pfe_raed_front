import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffreService } from '../../service/offre.service';

@Component({
  selector: 'app-offre-admin',
  templateUrl: './offre-admin.component.html',
  styleUrl: './offre-admin.component.scss'
})
export class OffreAdminComponent {

  listOffres: any;

  constructor(
     private offreService:OffreService 
    ){ }

  ngOnInit(): void {
    this.findAll();
    
  }

  findAll(){
    this.offreService.getAllOffers().subscribe(
      (data) => {
        this.listOffres=data; 
        console.log(this.listOffres)
      }
    )
  }


}
