import { Component, OnInit } from '@angular/core';
import { CommentData, PostService } from "../../core/services/post.service";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule, NgForOf } from "@angular/common";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../../account/authentification/auth.service";

declare var bootstrap: any;

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    SharedModule,
    NgForOf,
    RouterLink,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts: any[] = [];
  user: string | null = localStorage.getItem('currentUser');
  searchInput: string = '';

  breadcrumbItems: any[] = [];
  newPost: any = {
    title: '',
    body: ''
  };
  newComment: CommentData = {
    content: '',
    createdAt: new Date(),
    user: '',
    post: {
      id: '',
      title: '',
      body: '',
      likes: 0,
      img: '',
      date: new Date(),
      comments: [],
      user: null
    }
  };

  commentsToShow = 3;

  loadMoreComments() {
    this.commentsToShow += 3;
  }
  selectedFile: File | null = null;
  editMode: boolean = false;
  editPostId: string | null = null;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe((data: any[]) => {
      this.posts = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(this.posts);
    });
  }

  getPosts(): void {
    if (this.searchInput) {
      this.posts = this.posts.filter(post => post.title.toLowerCase().includes(this.searchInput.toLowerCase()));
    } else {
      this.loadPosts();
    }
  }

  openModal(): void {
    const modalElement = document.getElementById('createPostModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.user) {
      const userId = JSON.parse(this.user).id;
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('post', JSON.stringify(this.newPost));
      if (this.selectedFile) {
        formData.append('imgFile', this.selectedFile);
      }

      if (this.editMode && this.editPostId) {
        this.postService.updatePost(this.editPostId, formData).subscribe(() => {
          this.loadPosts();
          this.resetForm();
        });
      } else {
        this.postService.createPost(formData).subscribe(() => {
          this.loadPosts();
          this.resetForm();
        });
      }
    }
  }

  resetForm(): void {
    this.newPost = {
      title: '',
      body: ''
    };
    this.selectedFile = null;
    this.editMode = false;
    this.editPostId = null;
    const modalElement = document.getElementById('createPostModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  editPost(post: any): void {
    if (this.user) {
      const currentUser = JSON.parse(this.user);
      if (post.user.id === currentUser.id) {
        this.newPost = { title: post.title, body: post.body };
        this.editMode = true;
        this.editPostId = post.id;
        this.openModal();
      } else {
        // Optionally show an error message or redirect
        console.error("You can only edit your own posts.");
      }
    }
  }

  parseJson(value: string): any {
    return JSON.parse(value);
  }

  deletePost(postId: string): void {
    if (this.user) {
      const currentUser = JSON.parse(this.user);
      const post = this.posts.find(p => p.id === postId);
      if (post.user.id === currentUser.id) {
        this.postService.deletePost(postId).subscribe(() => {
          this.loadPosts();
        });
      } else {
        // Optionally show an error message or redirect
        console.error("You can only delete your own posts.");
      }
    }
  }

  addComment(postId: string, comment: CommentData) {
    if (this.user && comment.content) {
      const user = JSON.parse(this.user);
      if(user.role[0] === 'ROLE_CLIENT'){
        user.role = 'CLIENT';
      }else if(user.role[0] === 'ROLE_ADMIN'){
        user.role = 'ADMIN';
      }
      else if(user.role[0] === 'ROLE_ENTREPRISE'){
        user.role = 'ENTREPRISE';
      }
      comment.user = user;
      comment.post = { id: postId, title: '', body: '', likes: 0, img: '', date: new Date(), comments: [], user: user }; // Set the 'post' field to a 'Post' object with the 'id' field set to 'postId'
      console.log(user.id, postId, comment);
      this.postService.addComment(user.id, postId, comment).subscribe({
        next: () => {
          this.loadPosts(); // Refresh the posts
          this.newComment = {
            content: '',
            createdAt: new Date(),
            user: '',
            post: {
              id: '',
              title: '',
              body: '',
              likes: 0,
              img: '',
              date: new Date(),
              comments: [],
              user: null
            }
          };
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }
}
