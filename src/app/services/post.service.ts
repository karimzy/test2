//import { PostService } from './post.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  //apiUrl="http://localhost:3000/posts/";
  apiUrl="https://jsonplaceholder.typicode.com/posts";
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Post[]>(this.apiUrl);
  }

  findPostById(id){
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  delete(id){
    return this.http.delete( `${this.apiUrl}/${id}` )
  }

  persist(post){
    return this.http.post<Post>(this.apiUrl, post);
  }

  completed(id, completed){
    return this.http.patch(`${this.apiUrl}/${id}`,{completed: !completed});
  }

  update(post){
    return this.http.put(`${this.apiUrl}/${post.id}`,post)
  }

}
