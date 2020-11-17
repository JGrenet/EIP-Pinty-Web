class Friends {
  public id: number;
  public name: string;
  public pp: string;
}

class Place {
  public id: number;
  public placeId: number;
  public latitude: number;
  public longitude: number;
  public name: string;
  public types: string;
  public rating: number;
  public googleRating: number;
  public compatibility: number;
  public subs: string[];
  public image: string;
  public friends: Friends[];
}

export class PlaceResult {
  constructor(public nextPageToken: string, public results: Place[]) {
  }
}
