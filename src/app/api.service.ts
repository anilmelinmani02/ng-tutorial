

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createPost(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl, data, { headers });
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, post);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${postId}`);
  }
}
