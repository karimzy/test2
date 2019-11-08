import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
 //apiUrl="http://localhost:3000/comments/";
 apiUrl="https://jsonplaceholder.typicode.com/comments";
  constructor(private http: HttpClient) { }

  findCommentsPost(postId){
    //return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`);
    return this.http.get<Comment[]>(this.apiUrl+"?postId="+postId);
  }

  persist(comment){
    return this.http.post<Comment>(this.apiUrl, comment);
  }
 
}
