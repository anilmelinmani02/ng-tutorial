import { Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';

export const routes: Routes = [
      {path : '', redirectTo : 'posts', pathMatch: 'full'}, 
      {path: 'edit-delete', component : DialogComponent},
      {path: 'posts', component : PostsComponent}] ;
