import {Component, OnInit} from '@angular/core';
import { OffreService } from '../../service/offre.service';
import {AuthService} from "../../../../account/authentification/auth.service";

@Component({
  selector: 'app-mes-offres',

  templateUrl: './mes-offres.component.html',
  styleUrl: './mes-offres.component.scss'
})
export class MesOffresComponent implements OnInit {
  offers: any;
  breadCrumbItems!: Array<{}>;


  constructor(
    private offerService: OffreService,
  private authService: AuthService,

  ) {}

  ngOnInit(): void {
    const userIdFromLocalStorage = this.authService.getUserIdFromLocalStorage();
    if (userIdFromLocalStorage !== null) {
      this.offerService.getOffersByUserId(userIdFromLocalStorage).subscribe(data => {
        this.offers = data;
      });
    }
  }

  formatDate(date: string): string {
    // Implement formatDate method
    // This is just a placeholder. Replace it with your actual implementation.
    return new Date(date).toLocaleDateString();
  }

}

