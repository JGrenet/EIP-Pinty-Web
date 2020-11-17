export class ConnectResponse {
  constructor (_id: string, _socialID: string, _apiKey: string, _created: boolean) {
    this.id = _id;
    this.socialID = _socialID;
    this.apiKey = _apiKey;
    this.created = _created;
  }

  id: string;
  socialID: string;
  apiKey: string;
  created: boolean;
}
