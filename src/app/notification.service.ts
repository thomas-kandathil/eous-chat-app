import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSound = new Audio('assets/eventually-590.mp3');

  constructor() {
    // preload audio
    this.notificationSound.load();
  }

  requestPermission() {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  showNotification(title: string, options?: NotificationOptions) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
      this.notificationSound.play().catch(() => { });
    }
  }
}
