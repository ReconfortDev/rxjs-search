import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {catchError, concat, concatMap, from, interval, of, take, throwError} from "rxjs";
import {SearchComponent} from "./components/search/search.component";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjsBasics';

}
