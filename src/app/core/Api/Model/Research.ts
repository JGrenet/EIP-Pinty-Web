import {ProfileResult} from './ProfileResult';
import {PlaceResult} from './PlaceResult';

export class Research {

  constructor(public nextPageToken: string, public placeResults: PlaceResult[], public profileResults: ProfileResult[]) {
    this.nextPageToken = nextPageToken;
    this.placeResults = placeResults;
    this.profileResults = profileResults;
  }
}
