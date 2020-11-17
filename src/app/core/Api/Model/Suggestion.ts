import {Review} from './Reviews';

export class Suggestion {

  constructor(public id: string, public suggestionID: string, public name: string, public type: string, public image: string,
              public rating: number, public compatibility: number) {
    this.id = id;
    this.suggestionID = suggestionID;
    this.name = name;
    this.type = type;
    this.image = image;
    this.rating = rating;
    this.compatibility = compatibility;
  }
}

export class Suggestions {
  constructor(_results: Suggestion[]) {
    this.results = _results;
  }
  results: Suggestion[];
}
