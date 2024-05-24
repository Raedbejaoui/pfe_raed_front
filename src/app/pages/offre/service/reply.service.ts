import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private baseUrl = 'http://localhost:8081/reply'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  createReply(userId: string, offerId: string, reply: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('reply', new Blob([JSON.stringify(reply)], { type: 'application/json' }));

    return this.http.post<any>(`${this.baseUrl}/add/${userId}/${offerId}`, formData);
  }
}
