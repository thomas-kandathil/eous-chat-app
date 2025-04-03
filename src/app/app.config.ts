import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), importProvidersFrom(
    FormsModule), provideFirebaseApp(() => initializeApp(firebase)),
  provideFirestore(() => getFirestore())]
};

export const firebase = {
  apiKey: "AIzaSyCNlUzJzvMDlybTq2YibI5RfCZDtuwEMSo",
  authDomain: "eous-chat-app.firebaseapp.com",
  projectId: "eous-chat-app",
  storageBucket: "eous-chat-app.firebasestorage.app",
  messagingSenderId: "1:844723111447:web:3adfe76ee0c99d607e3e52",
  appId: "YOUR_APP_ID"
}


