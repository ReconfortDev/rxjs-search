import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { PostsJson, UsersJson } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  constructor() { }

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }

  getSearchResults() {
    return this.search$.pipe(
      debounceTime(300),
      switchMap(term => {
        if (term.length < 1) {
          // When no search term is provided, return all data
          return of({ users: UsersJson, posts: PostsJson });
        }
        return this.simulateApiCall(term);
      }),
      catchError(err => {
        console.error('Error fetching search results:', err);
        return of({ users: [], posts: [] });
      })
    );
  }

  private simulateApiCall(term: string) {
    const filteredUsers = UsersJson.filter(
      user =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.description.toLowerCase().includes(term.toLowerCase()) ||
        user.category.some(category => category.toLowerCase().includes(term.toLowerCase())) ||
        user.details.toLowerCase().includes(term.toLowerCase())
    );

    const filteredPosts = PostsJson.filter(
      post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.description.toLowerCase().includes(term.toLowerCase()) ||
        post.category.some(category => category.toLowerCase().includes(term.toLowerCase())) ||
        post.details.toLowerCase().includes(term.toLowerCase())
    );

    return combineLatest([of(filteredUsers), of(filteredPosts)]).pipe(
      map(([users, posts]) => ({ users, posts })),
      startWith({ users: [], posts: [] })
    );
  }
}
