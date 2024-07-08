import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {
  private baseUrl = 'http://localhost:8081/elastic'; // replace with your server address

  constructor(private http: HttpClient) { }

  createOrUpdateDocument<T>(document: T): Observable<any> {
    return this.http.post(`${this.baseUrl}/createOrUpdateDocument`, document);
  }

  getDocumentById<T>(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/getDocument?id=${id}`);
  }

  deleteDocumentById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteDocument?id=${id}`);
  }

  searchAllDocuments<T>(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/searchDocument`);
  }
  searchDocuments<T>(searchTerm: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/searchDocument?searchTerm=${searchTerm}`);
  }
}
