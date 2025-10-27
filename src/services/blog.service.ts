import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Blog } from '../types/Blog';

@Injectable({
  providedIn: 'root',
})
export class Blogservice {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/api';

  createBlogData(data: Blog): Observable<any> {
    return this.http.post(`${this.apiUrl}/createBlogData`, data);
  }
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getBlogData`);
  }
  delData(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delBlogData/${id}`);
  }
  getSingle(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSingleData/${id}`);
  }
  updateData(id: string, data: Blog): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateBlogData/${id}`, data);
  }
}
