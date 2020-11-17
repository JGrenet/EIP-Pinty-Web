class AdminMediaItem {
  id: string;
  updatedAt: number;
  createdAt: number;
  authorID: string;
  filePath: string;
  reviewID: string;
  placeID: string;
  type: string;
  height: number;
  width: number;
  size: number;
}

export class AdminMediasList {

  constructor(_results: AdminMediaItem[]) {
    this.results = _results;
  }
  results: AdminMediaItem[];
}
