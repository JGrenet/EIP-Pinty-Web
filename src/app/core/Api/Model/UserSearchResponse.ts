class UserSearch {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  image: string;
  role: string;
}

export class UserSearchResponse {
  results: UserSearch[];
}
