class AdminFeedbackItem {
  id: string;
  updatedAt: number;
  createdAt: any;
  authorID: string;
  title: string;
  content: string;
  medias: string[];
}
export class AdminFeedbacksList {

  constructor(_results: AdminFeedbackItem[]) {
    this.results = _results;
  }
  results: AdminFeedbackItem[];
}
