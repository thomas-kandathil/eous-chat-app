import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  private SECRET_KEY = "aKJJSD98989sdJIDJW";

  constructor() { }

  encryptMessage(message: string): string {
    return CryptoJS.AES.encrypt(message, this.SECRET_KEY).toString();
  }

  decryptMessage(encrypted: string): string {
    const bytes = CryptoJS.AES.decrypt(encrypted, this.SECRET_KEY);
    let decrypt = bytes.toString(CryptoJS.enc.Utf8);
    return decrypt || '*****encrypted message*****';
  }
}
