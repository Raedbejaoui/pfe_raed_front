import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client!: Client;
  private messages: Subject<any> = new Subject<any>();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadSockJS().then((SockJS) => {
        this.client = new Client({
          brokerURL: 'ws://localhost:8080/ws',
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          webSocketFactory: () => new SockJS('http://localhost:8081/ws')
        });

        this.client.onConnect = () => {
          this.client.subscribe('/topic/messages', (message: Message) => {
            const chatMessage = JSON.parse(message.body);
            this.messages.next(chatMessage);
          });
        };

        this.client.activate();
      }).catch((error) => {
        console.error('Failed to load SockJS:', error);
      });
    } else {
      console.warn('WebSocketService is not initialized in server-side rendering (SSR) environment.');
    }
  }

  private async loadSockJS(): Promise<any> {
    // Use dynamic import for SockJS
    const module = await import('sockjs-client');
    return module;
  }

  public sendMessage(message: any) {
    if (isPlatformBrowser(this.platformId) && this.client) {
      this.client.publish({
        destination: '/app/send',
        body: JSON.stringify(message)
      });
    }
  }

  public getMessages(): Observable<any> {
    return this.messages.asObservable();
  }
}
