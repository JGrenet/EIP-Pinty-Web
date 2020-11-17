class Profile {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  image: string;
  role: string;
}

export class ProfileResult {

  constructor(public results: Profile[]) {

  }
}
