import {ReviewAuthor} from './Reviews';

export class MediaMetadata {
  type: string;
  length: number;
  width: number;
  size: number;
}

export class MediaItem {
  id: string;
  reviewID: string;
  author: ReviewAuthor;
  url: string;
  metadata: MediaMetadata;
}

export default class Media {
  constructor(_results: MediaItem[]) {
    this.results = _results;
  }
  results: MediaItem[];
}
