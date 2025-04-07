import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket = io('https://eous-chat-be.onrender.com'); // your backend

  sendMessage(msg: Message) {
    this.socket.emit('chat message', msg);
  }

  getMessages(): Observable<Message> {
    return new Observable(observer => {
      this.socket.on('chat message', (msg: Message) => {
        observer.next(msg);
      });
    });
  }
}

interface Message {
  text: string;
  timestamp: number;
  sender: string;
}
