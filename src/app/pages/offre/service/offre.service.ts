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
          return this.http.get(`${this.baseUrl}/${offerId}`);

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
          return this.http.get(this.baseUrl+`/getall`);

        }






}








