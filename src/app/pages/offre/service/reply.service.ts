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
  const url = `${this.baseUrl}/add/${userId}/${offerId}`;
  const formData: FormData = new FormData();
  formData.append('reply', JSON.stringify(reply));
  formData.append('file', file);
  return this.http.post(url, formData);
}
deleteReply(id: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/deleteReply/${id}`);
}
}


