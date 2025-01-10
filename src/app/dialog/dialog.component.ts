import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ApiService } from '../api.service';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-dialog',
    imports: [CommonModule, FormsModule, RouterModule, ButtonModule, TableModule, InputTextModule, PanelModule, DialogModule],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss'
})
export class DialogComponent {
    viewPost(_t51: any) {
        throw new Error('Method not implemented.');
    }

    posts: any[] = [];
    newPost = { title: "", body: "" };
    isFormVisible = false;
    editingPost: any = {};

    displayDialog = false;
    postToDelete: any = null;  // Store the post to delete

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

    confirmDelete(post: any) {
        this.postToDelete = post;
        this.displayDialog = true;
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

        this.displayDialog = false;
    }

    cancelDelete() {
        this.displayDialog = false;
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


    // deletePost(postId: number): void {
    //     this.apiService.deletePost(postId).subscribe({
    //         next: () => {
    //             this.posts = this.posts.filter((post: any) => post.id !== postId);
    //             console.log("Post deleted with ID:", postId);
    //         },
    //         error: (error) => {
    //             console.error("Error deleting post:", error);
    //         }
    //     });

    //     this.displayDialog = false;
    // }

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








