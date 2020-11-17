class Sub {
  id: string;
  name: string;
  image: string;
  subscribed: boolean;
}

export class Subs {

  constructor(_results: Sub[]) {
    this.results = _results;
  }

  results: Sub[];
}
