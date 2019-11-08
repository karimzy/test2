import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  public postId;
  comments: Comment[]=[];
  resultComments: Comment[]=[];

  searchText='';

  showForm=false;
  editForm=false;

  monCommentaire: Comment={
    postId: 1,
    name: '',
    email: '',
    body: ''
  }
  

  constructor(private route: ActivatedRoute, private postService:PostService, private commentService:CommentService) { }

  ngOnInit() {
    let id=parseInt(this.route.snapshot.paramMap.get('id'));
    this.postId=id;
    this.getPostById(this.postId);
    this.getComments(this.postId);

  }

    // fonction get post by id
    post:Post;
    getPostById(id){
       this.postService.findPostById(id)
           .subscribe(post=>this.post=post)
    }
  // methode pour recuperer les commentaires d'un article
  getComments(postId){
    this.commentService.findCommentsPost(postId)
        .subscribe(comments=>this.comments=comments)
  }

  // la fonction de l'ajout d'un nouveau article
  persistComment(){
    this.commentService.persist(this.monCommentaire)
        .subscribe((comment) => {
          this.comments=[...this.comments, comment];
          this.resetComment();
          
        })
  }

  resetComment(){
    this.monCommentaire={
      postId: 0,
    name: '',
    email: '',
    body: ''
    }
  }

}
