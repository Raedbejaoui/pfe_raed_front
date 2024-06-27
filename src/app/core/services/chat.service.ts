import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8081/api/chat';

  constructor(private http: HttpClient) {}

  createChat(chat: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, chat);
  }

  getMessages(chatId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/messages/${chatId}`);
  }

  sendMessage(chatId: string, message: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${chatId}/send`, message);
  }

  getChatsForUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }
}
