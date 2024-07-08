import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private baseUrl = 'http://localhost:8081/reclamation';

  constructor(private http: HttpClient) { }

  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetAll`);
  }

  addReclamation(id: string, reclamation: any): Observable<any> {
    const payload = {
      ...reclamation,
      user: { id: reclamation.user }
    };
    return this.http.post<any>(`${this.baseUrl}/add/${id}`, payload);
  }

  deleteReclamation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getReclamationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateReclamation(id: string, reclamation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, reclamation);
  }

  updateEtatReclamation(id: string, etat: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/etat/${id}`, etat);
  }

  getReclamationsByUserId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Get/${id}`);
  }
}
