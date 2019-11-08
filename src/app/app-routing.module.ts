import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';


const routes: Routes = [
  { path: '', redirectTo:'/posts', pathMatch: 'full'},
  { path: 'posts', component: PostsComponent},
  {path: 'posts/:id', component: PostDetailComponent },
  { path: 'comments', component: CommentsComponent}
  //{ path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[PostsComponent, CommentsComponent, PostDetailComponent]
