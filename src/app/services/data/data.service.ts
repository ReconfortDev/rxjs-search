import { Injectable } from '@angular/core';
import {combineLatest, delay, map, Observable, of} from "rxjs";
import {PostModel, UserModel} from "../../models";
import {PostsJson, UsersJson} from "../../data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getUsers(): Observable<UserModel[]> {
    return of(UsersJson).pipe(delay(1000))
  }

  getPosts(): Observable<PostModel[]> {
    return of(PostsJson).pipe(delay(1000))
  }

  getAllCategories(): Observable<string[]> {
    return combineLatest([this.getUsers(), this.getPosts()]).pipe(
      map(([users, posts]) => {
        const userCategories = users.flatMap(user => user.category);
        const postCategories = posts.flatMap(post => post.category);
        return Array.from(new Set([...userCategories, ...postCategories]))
      })
    )
  }
}
