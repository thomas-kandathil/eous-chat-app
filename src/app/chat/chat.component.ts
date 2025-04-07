import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../crypto.service';
import { DecryptPipe } from '../decrypt.pipe';
import { ChatService } from '../chat.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule, DecryptPipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})


export class ChatComponent implements OnInit {
  newMessage: string = '';
  sender: string = 'User' + Math.floor(Math.random() * 1000);
  private cryptoService = inject(CryptoService);
  private chat = inject(ChatService);
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  messages: Message[] = [];

  constructor() {

  }
  ngOnInit(): void {
    if (localStorage.getItem('sender')) this.sender = localStorage.getItem('sender') || '';
    this.http.get<Message[]>('https://eous-chat-be.onrender.com/messages').subscribe(msg => {
      this.messages = msg;
    });
    this.notificationService.requestPermission();
    this.chat.getMessages().subscribe(msg => {
      this.messages.push(msg);
      if (msg.sender != this.sender) {
        this.notificationService.showNotification('New message from ' + msg.sender, {
          body: this.cryptoService.decryptMessage(msg.text),
          icon: 'assets/chat-icon.png',
        });
      }
    });
  }


  send() {
    localStorage.setItem('sender', this.sender);
    this.scrollToView(document.getElementById('pinnedChat'));
    this.chat.sendMessage({
      text: this.cryptoService.encryptMessage(this.newMessage),
      timestamp: Date.now(),
      sender: this.sender
    });
    this.newMessage = '';
  }
  scrollToView(element: any) {
    element.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

interface Message {
  text: string;
  timestamp: number;
  sender: string;
}
