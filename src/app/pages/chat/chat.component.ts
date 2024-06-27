import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {WebSocketService} from "../../core/services/web-socket-service.service";
import {ChatService} from "../../core/services/chat.service";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../account/authentification/auth.service";
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    SharedModule,
    DatePipe,
    AsyncPipe,
    // Add FormsModule here
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('chatMessages', { read: ElementRef }) chatMessages!: ElementRef;

  messages: any[] = [];
  enterpriseId: string = '';
  enterpriseName: string | null = '';
  messageToSend: string = '';
  user = localStorage.getItem('currentUser') || '';
  senderId = JSON.parse(this.user).id;
  websocketSubscription: Subscription | undefined;
  chats: any[] = [];
  selectedChat: any = this.route.snapshot.paramMap.get('id') || '';
  selectedChatId: string | null = null;

  userNameMap: { [key: string]: string } = {};



  constructor(private webSocketService: WebSocketService, private chatService: ChatService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.enterpriseId = this.route.snapshot.paramMap.get('id') || '';
    this.getEntreprise();
    this.websocketSubscription = this.webSocketService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
    this.loadChats();


  }

  ngOnDestroy(): void {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    } catch (err) { }
  }
  loadUserNames(): void {
    this.chats.forEach(chat => {
      const otherUserId = chat.participants[1] === this.senderId ? chat.participants[0] : chat.participants[1];
      this.getUserName(otherUserId).subscribe(userName => {
        this.userNameMap[otherUserId] = userName;
      });
    });
  }
  loadMessages(chatId: string) {
    if (chatId) {
      this.chatService.getMessages(chatId).subscribe(chats => {
        if (chats.length > 0) {
          this.messages = chats[0].messages;
          console.log('Messages loaded successfully:', this.messages);
        }
      }, error => {
        console.error(error);
      });
    }
  }
  getUserName(userId: string): Observable<string> {
    return this.authService.loadUserById(userId).pipe(
      map(user => {
        console.log('User loaded successfully:', user);
        return user.name ? user.name : user.firstName;
      }),
      catchError(error => {
        console.error(error);
        return of('Unknown user');
      })
    );
  }
  sendMessage(messageText: string) {
    if (this.selectedChatId) {
      const message = {
        id: this.selectedChatId + '-' + Date.now(),
        chatId: this.selectedChatId,
        senderId: this.senderId,
        recepientId: this.enterpriseId,
        content: messageText,
        timestamp: Date.now(),
      };
      this.chatService.sendMessage(this.selectedChatId, message).subscribe(() => {
        console.log('Message sent successfully');
        if(this.selectedChatId){
          this.loadMessages(this.selectedChatId);
        }
        this.messageToSend = '';

      }, error => {
        console.error('Error sending message:', error);
      });
    } else {
      console.error('No chat selected');
    }
  }


  loadChats() {
    if (this.senderId) {
      this.chatService.getChatsForUser(this.senderId).subscribe(chats => {
        this.chats = chats;
        const chatExists = this.chats.find(chat => chat.idChat === this.senderId + '-' + this.enterpriseId);
        if (chatExists) {
          this.selectedChat = chatExists;
          this.loadMessages(this.selectedChat.id);
          this.selectChat(this.selectedChat.idChat);
        } else if (this.enterpriseId) {
          console.log('chat does not exist, creating chat');
          this.createChat();
        } else if (this.chats.length > 0) {
          this.selectedChat = this.chats[0];
          this.loadMessages(this.selectedChat.id);
          this.selectChat(this.selectedChat.idChat);
        }
        this.loadUserNames();
      }, error => {
        console.error(error);
        if (error.status === 404 && this.enterpriseId) {
          console.log('chat does not exist, creating chat');
          this.createChat();
        }
      });
    }
  }
  createChat() {
    console.log('createChat method called');
    console.log('senderId:', this.senderId);
    console.log('enterpriseId:', this.enterpriseId);

    const chat = {
      idChat: this.senderId + '-' + this.enterpriseId,
      participants: [this.senderId, this.enterpriseId]
    };

    console.log('chat to be created:', chat);

    this.chatService.createChat(chat).subscribe((newChat) => {
      console.log('chat created successfully:', newChat);
      this.selectedChat = newChat;
      this.loadChats();
      this.loadMessages(newChat.id);
    }, error => {
      console.error('error creating chat:', error);
    });
  }
  selectChat(chatId: string) {
    this.selectedChatId = chatId;
    this.selectedChat = this.chats.find(chat => chat.idChat === chatId);
    this.loadMessages(chatId);
  }

  getEntreprise(){
    this.authService.loadUserById(this.enterpriseId).subscribe((enterprise) => {
      this.enterpriseName = enterprise.name;
    }, error => {
      console.error(error);
    });
  }
}
