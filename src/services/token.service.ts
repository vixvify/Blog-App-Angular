import { Injectable, effect, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Token {
  tokenSignal = signal<any>(undefined);
  constructor() {
    this.setToken();
  }
  setToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decode = jwtDecode(token);
      this.tokenSignal.set(decode);
      return decode;
    }
    return undefined;
  }
  clearToken() {
    localStorage.removeItem('token');
    this.tokenSignal.set(undefined);
    return;
  }
}
