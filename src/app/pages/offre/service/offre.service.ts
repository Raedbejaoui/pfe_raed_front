import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:8081/Offer';


  getOffersByUserId(userId: string): Observable<any> {
    const url = `${this.baseUrl}/getbyuser/${userId}`;
    return this.http.get(url);
  }

  addOffer(userId: string, offer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addoffer/${userId}`, offer);
  }

  getOfferById(offerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${offerId}`);
  }

  updateOffer(offerId: string, updatedOffer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${offerId}`, updatedOffer);
  }


  deleteOffer(offerId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${offerId}`);
  }

  getAllOffers(): Observable<any> {
    return this.http.get(this.baseUrl+`/getall`);
  }
updateOfferStatus(offerId: string, newStatus: string): Observable<any> {
  const params = new HttpParams().set('status', newStatus);
  return this.http.put(`${this.baseUrl}/${offerId}/status`, {}, { params: params });
}
}
