import {Component, OnInit} from '@angular/core';
import {SearchComponent} from "../components/search/search.component";
import {BodyComponent} from "../components/body/body.component";
import {map, Observable} from "rxjs";
import {PostModel, UserModel} from "../models";
import {AsyncPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {SearchService} from "../services/search/search.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchComponent,
    BodyComponent,
    NgForOf,
    AsyncPipe,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users$!: Observable<UserModel[]>;
  posts$!: Observable<PostModel[]>;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    const searchResults$ = this.searchService.getSearchResults();
    this.users$ = searchResults$.pipe(map(results => results.users));
    this.posts$ = searchResults$.pipe(map(results => results.posts));
  }

}
