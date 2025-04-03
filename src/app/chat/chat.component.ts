import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})


export class ChatComponent {
  messages$: Observable<Message[]>;
  newMessage: string = '';
  sender: string = 'User' + Math.floor(Math.random() * 1000);
  private firestore = inject(Firestore);

  constructor() {
    const messagesCollection = collection(this.firestore, 'messages');

    // Ensure real-time updates by ordering messages by timestamp
    const messagesQuery = query(messagesCollection, orderBy('timestamp', 'asc'));
    this.messages$ = collectionData(messagesQuery, { idField: 'id' }) as Observable<Message[]>;
  }

  async sendMessage() {
    if (!this.newMessage.trim()) return;
    const messagesCollection = collection(this.firestore, 'messages');
    await addDoc(messagesCollection, {
      text: this.newMessage,
      timestamp: Date.now(),
      sender: this.sender
    });
    this.newMessage = '';
  }
}

interface Message {
  text: string;
  timestamp: number;
  sender: string;
}
