import {Component, Input} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {UserComponent} from "../user/user.component";
import {PostModel, UserModel} from "../../models";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CardComponent,
    UserComponent,
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  @Input() posts! : PostModel[]
  @Input() users! : UserModel[]
}
