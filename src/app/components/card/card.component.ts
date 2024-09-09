import {Component, Input} from '@angular/core';
import {PostModel} from "../../models";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() post!: PostModel;

}
