import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  searchText='';

  showForm=false;
  editForm=false;

  monArticle: Post={
    title: '',
    resume:'',
    body:'',
    author:'',
  }

 
 posts: Post[]=[];
 resultPosts: Post[]=[];

  constructor(private postService: PostService, private router:Router) { }

  ngOnInit() {
     this.getPosts();
  }
  getPosts(){
    this.postService.findAll()
        .subscribe(posts => {
          this.resultPosts=this.posts=posts
        })
  }



  deletePost(id){
    this.postService.delete(id)
        .subscribe(()=>{
          this.posts= this.posts.filter(post=>post.id !=id)
        })
  }
  //fonction afiche detail article
  affichePost(post){
     this.router.navigate(['/posts',post.id])
  }

  // la fonction de l'ajout d'un nouveau article
  persistPost(){
    this.postService.persist(this.monArticle)
        .subscribe((post) => {
          this.posts=[post, ...this.posts];
          this.resetPost();
          this.showForm=false;
        })
  }

  resetPost(){
    this.monArticle={
      title: '',
      resume:'',
      body:'',
      author:'',
    }
  }

  changerCompleted(post){
    this.postService.completed(post.id, post.completed)
        .subscribe(() => {
            post.completed= !post.completed
        })
  }

  editPost(post){
    this.monArticle=post;

  }

  updatePost(){
    this.postService.update(this.monArticle)
        .subscribe(post => {
          this.resetPost();
          this.editForm=false;
        })
  }

   searchPosts(){
     this.resultPosts=this.posts.filter((post)=>post.title.toLowerCase().includes(this.searchText.toLowerCase()));
   }

}
