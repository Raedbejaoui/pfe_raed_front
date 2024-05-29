import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

interface PostData {
  title: string;
  body: string;
  imgPath?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:8081/Post'; // L'URL de base de l'API


  createPost(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updatePost(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, formData);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
