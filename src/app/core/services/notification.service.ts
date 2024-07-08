import {Injectable, EventEmitter, OnInit} from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { map } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import {AuthService} from "../../account/authentification/auth.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Notification} from "../../models/notification.model";
import {HttpHeaders}   from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
// src/app/core/services/notification.service.ts


export class NotificationService {
  private apiUrl = 'http://localhost:8081/notifications'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  sendNotification(userId: string, message: string): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/send/${userId}`, message);
  }

  getUnreadNotifications(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/unread/${userId}`);
  }

  markNotificationAsRead(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { isRead: true });
  }
}

