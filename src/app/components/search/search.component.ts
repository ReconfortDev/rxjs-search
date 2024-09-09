import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {CardComponent} from "../card/card.component";
import {UserComponent} from "../user/user.component";
import {SearchService} from "../../services/search/search.service";
import {Observable} from "rxjs";
import {DataService} from "../../services/data/data.service";


@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CardComponent,
    UserComponent,
    NgStyle
  ],
  styleUrl: './search.component.css'
})
export class SearchComponent{
  searchControl = new FormControl('');
  activeFiltered: string | null = null;
  categories$: Observable<string[]>;

  constructor(private searchService: SearchService, private dataService: DataService) {
    this.searchControl.valueChanges.subscribe(term => this.searchService.updateSearchTerm(term!));
    this.categories$ = this.dataService.getAllCategories();
  }

  toggleCategory(category: string) {
    if (this.activeFiltered === category) {
      this.activeFiltered = null;
      this.searchControl.setValue('');
    } else {
      this.activeFiltered = category;
      this.searchControl.setValue(category);
    }
  }
}
