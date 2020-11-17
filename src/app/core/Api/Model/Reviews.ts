import {MediaItem} from './Media';

export class ReviewAuthor {
  id: string;
  name: string;
  pp: string;
}

class LightPlace {
  id: string;
  name: string;
  image: string;
}

export class Review {
  constructor(_id: string, _type: string, _author: ReviewAuthor, _rating: number, _message: string, _place: LightPlace,
              _medias: MediaItem[], _created: number) {
    this.id = _id;
    this.type = _type;
    this.author = _author;
    this.rating = _rating;
    this.message = _message;
    this.place = _place;
    this.medias = _medias;
    this.created = _created;
  }
  id: string;
  type: string;
  author: ReviewAuthor;
  rating: number;
  message: string;
  place: LightPlace;
  medias: MediaItem[];
  created: number;
}

export class Reviews {
  constructor(_results: Review[]) {
    this.results = _results;
  }
  results: Review[];
}
