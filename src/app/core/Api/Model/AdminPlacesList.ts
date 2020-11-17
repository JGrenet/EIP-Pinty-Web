class AdminPlaceItem {
  id: string;
  updatedAt: number;
  createdAt: number;
  placeID: string;
  name: string;
  formattedAddress: string;
  location: number[];
  image: string;
  openingHours: string[];
  phone: string;
  priceLevel: number;
  rating: number;
  googleRating: number;
  types: string;
  website: string;
  lastRequest: string;
  subs: string[];
}

export class AdminPlacesList {
  constructor(_results: any) {
    this.results = _results;
  }
  results: AdminPlaceItem[];
}
