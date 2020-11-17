export class AdminUserItem {
  id: string;
  updatedAt: number;
  createdAt: number;
  userName: string;
  firstName: string;
  lastName: string;
  image: string;
  role: string;
  adminOf: string[];
  gender: string;
  email: string;
  city: string;
  description: string;
  subPlaces: string[];
  friends: string[];
  groups: string[];
  pendingReview: string[];
}

export class AdminUsersList {
  constructor(_results: AdminUserItem[]) {
    this.results = _results;
  }
  results: AdminUserItem[];
}
