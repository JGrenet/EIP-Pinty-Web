import { Component, Input } from '@angular/core';
import { FriendsPassage } from '../../../core/Api/Model/PlaceInfo';

@Component({
  selector: 'app-friendPassage',
  templateUrl: './friendPassage.component.html',
  styleUrls: ['./friendPassage.component.scss']
})

export class FriendPassageComponent {
  @Input() friendPassage: FriendsPassage[];
  @Input() textColor: string;
}
