import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:8081/Offer'; // L'URL de base de l'API

  // Méthode pour ajouter une offre pour un utilisateur donné
  addOffer(userId: string, offer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addoffer/${userId}`, offer);
  }

  getOfferById(offerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${offerId}`).pipe(
      catchError(error => {
        console.error('Une erreur s\'est produite lors de la récupération de l\'offre par ID:', error);
        throw error; // Vous pouvez choisir de relancer l'erreur ou de la gérer différemment selon vos besoins
      })
    );
  }

  updateOffer(offerId: string, updatedOffer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${offerId}`, updatedOffer);
  }

  // Méthode pour supprimer une offre
  deleteOffer(offerId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${offerId}`);
  }

  // Méthode pour récupérer toutes les offres
  getAllOffers(): Observable<any> {
    return this.http.get(this.baseUrl+`/getall`).pipe(
      catchError(error => {
        console.error('Une erreur s\'est produite lors de la récupération des offres:', error);
        throw error; // Vous pouvez choisir de relancer l'erreur ou de la gérer différemment selon vos besoins
      })
    );
  }
}
