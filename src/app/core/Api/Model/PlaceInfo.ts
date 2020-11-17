export class FriendsPassage {
    id: string;
    name: string;
    pp: string;
}

export class PlaceInfo {

  constructor(_id: string, _placeId: string, _name: string, _formattedAddress: string, _location: number[], _phone: string,
              _priceLevel: number, _rating: number, _googleRating: number, _url: string, _website: string, _lastRequest: string,
              _types: string, _openingHours: string[], _compatibility: number, _subs: string[], _image: string,
              _friends: FriendsPassage[]) {

    this.id = _id;
    this.placeID = _placeId;
    this.name = _name;
    this.formattedAddress = _formattedAddress;
    this.location = _location;
    this.phone = _phone;
    this.priceLevel = _priceLevel;
    this.rating = _rating;
    this.googleRating = _googleRating;
    this.url = _url;
    this.website = _website;
    this.lastRequest = _lastRequest;
    this.types = _types;
    this.openingHours = _openingHours;
    this.compatibility = _compatibility;
    this.subs = _subs;
    this.image = _image;
    this.friends = _friends;
  }

  id: string;
  placeID: string;
  name: string;
  formattedAddress: string;
  location: number[];
  phone: string;
  priceLevel: number;
  rating: number;
  googleRating: number;
  url: string;
  website: string;
  lastRequest: string;
  types: string;
  openingHours: string[];
  compatibility: number;
  subs: string[];
  image: string;
  friends: FriendsPassage[];
}
