import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api';

  createUserData(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/createUserData`, data);
  }
  login(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
