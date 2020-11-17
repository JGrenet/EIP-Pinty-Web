export class AdminReviewItem {
  id: string;
  updatedAt: number;
  createdAt: number;
  authorID: string;
  placeID: string;
  rating: number;
  message: string;
}

export class AdminReviewsList {

  constructor(_results: AdminReviewItem[]) {
    this.results = _results;
  }
  results: AdminReviewItem[];
}
