import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private apiUrl = 'http://localhost:8081/api/auth/searchEnterprises';

  constructor(private http: HttpClient) { }

  searchEnterprises(searchPhrase: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?searchPhrase=${searchPhrase}`);
  }
}