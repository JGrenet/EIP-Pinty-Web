class FriendPassage {
  id: string;
  name: string;
  pp: string;
}

export class PlaceAround {
  id: string;
  placeID: string;
  latitude: number;
  longitude: number;
  name: string;
  types: string;
  rating: number;
  googleRating: number;
  compatibility: number;
  subs: string[];
  image: string;
  friends: FriendPassage[];
}

export class PlacesAround {
  constructor(public nextPageToken: string, public results: PlaceAround[]) {

  }
}
