// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-posts',
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './posts.component.html',
//   styleUrls: ['./posts.component.scss']
// })
// export class PostsComponent implements OnInit {
//   posts: any[] = [];
//   newPost = { title: "", body: "" };
//   isFormVisible = false;
//   editingPost: any = null;

//   constructor(private apiService: ApiService) {}

//   ngOnInit(): void {
//     this.loadPosts();
//   }

//   loadPosts(): void {
//     this.apiService.getPosts().subscribe({
//       next: (res) => {
//         this.posts = res;
//         console.log("Posts loaded: ", this.posts);
//       },
//       error: (error) => {
//         console.error("Error loading posts:", error);
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.editingPost) {
//       this.updatePost();
//     } else {
//       this.createPost();
//     }
//   }

//   createPost(): void {
//     this.apiService.createPost(this.newPost).subscribe({
//       next: (res) => {
//         this.posts.push(res);
//         console.log("Post created:", res);
//         this.resetForm();
//       },
//       error: (error) => {
//         console.error("Error creating post:", error);
//       }
//     });
//   }

//   editPost(post: any): void {
//     this.editingPost = { ...post };
//     this.newPost = { title: post.title, body: post.body };
//     this.isFormVisible = true;
//   }

//   updatePost(): void {
//     if (this.editingPost) {
//       this.apiService.updatePost(this.editingPost.id, this.newPost).subscribe({
//         next: (res) => {
//           const index = this.posts.findIndex((p: any) => p.id === this.editingPost.id);
//           if (index !== -1) {
//             this.posts[index] = res;
//           }
//           console.log("Post updated:", res);
//           this.resetForm();
//         },
//         error: (error) => {
//           console.error("Error updating post:", error);
//         }
//       });
//     }
//   }

//   deletePost(postId: number): void {
//     this.apiService.deletePost(postId).subscribe({
//       next: () => {
//         this.posts = this.posts.filter((post: any) => post.id !== postId);
//         console.log("Post deleted with ID:", postId);
//       },
//       error: (error) => {
//         console.error("Error deleting post:", error);
//       }
//     });
//   }

//   toggleForm(): void {
//     this.isFormVisible = !this.isFormVisible;
//     if (!this.isFormVisible) {
//       this.resetForm();
//     }
//   }

//   resetForm(): void {
//     this.newPost = { title: '', body: '' };
//     this.editingPost = null;
//     this.isFormVisible = false;
//   }
// }





import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {  PanelModule } from 'primeng/panel';

@Component({
    selector: 'app-posts',
    imports: [CommonModule, FormsModule, RouterModule,ButtonModule, TableModule, InputTextModule, PanelModule],
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    posts: any[] = [];
    newPost = { title: "", body: "" };
    isFormVisible = false;
    editingPost: any = {};

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.loadPosts();
    }

    loadPosts(): void {
        this.apiService.getPosts().subscribe({
            next: (res) => {
                this.posts = res;
                console.log("Posts loaded: ", this.posts);
            },
            error: (error) => {
                console.error("Error loading posts:", error);
            }
        });
    }

    onSubmit(): void {
        if (this.editingPost) {
            this.updatePost();
        } else {
            this.createPost();
        }
    }

    createPost(): void {
        this.apiService.createPost(this.newPost).subscribe({
            next: (res) => {
                this.posts.push(res);
                console.log("Post created:", res);
                this.resetForm();
            },
            error: (error) => {
                console.error("Error creating post:", error);
            }
        });
    }

    editPost(post: any): void {
        this.editingPost = { ...post };
        this.newPost = { title: post.title, body: post.body };
        this.isFormVisible = true;
    }

    updatePost(): void {
        if (this.editingPost) {
            this.apiService.updatePost(this.editingPost.id, this.newPost).subscribe({
                next: (res) => {
                    const index = this.posts.findIndex((p: any) => p.id === this.editingPost.id);
                    if (index !== -1) {
                        this.posts[index] = res;
                    }
                    console.log("Post updated:", res);
                    this.resetForm();
                },
                error: (error) => {
                    console.error("Error updating post:", error);
                }
            });
        }
    }


    deletePost(postId: number): void {
        this.apiService.deletePost(postId).subscribe({
            next: () => {
                this.posts = this.posts.filter((post: any) => post.id !== postId);
                console.log("Post deleted with ID:", postId);
            },
            error: (error) => {
                console.error("Error deleting post:", error);
            }
        });
    }

    toggleForm(): void {
        this.isFormVisible = !this.isFormVisible;
        if (!this.isFormVisible) {
            this.resetForm();
        }
    }

    resetForm(): void {
        this.newPost = { title: '', body: '' };
        this.editingPost = null;
        this.isFormVisible = false;
    }
}







