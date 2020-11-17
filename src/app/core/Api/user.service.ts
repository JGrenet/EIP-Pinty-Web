import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { UserProfile } from './Model/UserProfile';
import { environment } from '../../../environments/environment';
import {Reviews} from './Model/Reviews';
import {Subs} from './Model/Subs';

// My UserId : 5ac77461a60c4f208920408d
// My PintyKey : 9fe62ecfd84912be046d0bfaac267ebd

// Places
// Style Office Furniture W.L.L ==> 5ac8b8cef56b8b6127dce66c
// Al Hedaya Contracting Company W.L.L ==> 5ac8b8cef56b8b6127dce66d
// Costa Coffee - Manama Club Juffair ==> 5ac8b8cef56b8b6127dce66e
// Relation Suites ==> 5ac8b8cef56b8b6127dce66f

@Injectable()
export class UserService {
  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl + 'user/';
  }

  public GetUserProfile(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.serverUrl + 'id/' + userId + '/profile')
      .map((json: any) => new UserProfile (
        json.data.id,
        json.data.username,
        json.data.firstname,
        json.data.lastname,
        json.data.city,
        json.data.description,
        json.data.image,
        json.data.role,
        json.data.gender,
        json.data.birthday,
        json.data.email,
        json.data.accessType,
        json.data.friends,
        json.data.subPlaces
      ));
  }

  public GetUserPublicProfile(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.serverUrl + 'id/' + userId + '/profile/public')
      .map((json: any) => new UserProfile (
        json.data.id,
        json.data.username,
        json.data.firstname,
        json.data.lastname,
        json.data.city,
        json.data.description,
        json.data.image,
        json.data.role,
      ));
  }

  public UpdateUserProfile(userId: string, updatedFields: object): Observable<UserProfile> {
    return this.http.patch<UserProfile>(this.serverUrl + 'id/' + userId + '/profile/edit', updatedFields)
      .map((json: any) => new UserProfile (
        json.data.id,
        json.data.username,
        json.data.firstname,
        json.data.lastname,
        json.data.city,
        json.data.description,
        json.data.image,
        json.data.role,
        json.data.gender,
        json.data.birthday,
        json.data.email,
        json.data.accessType
      ));
  }

  public GetReviewsByUserId(userId: string): Observable<Reviews> {
    return this.http.get<Reviews>(this.serverUrl + 'id/' + userId + '/reviews')
      .map((json: any) => new Reviews(
          json.data.results
      ));
  }

  public AddNewFriend(userId: string, friendId: string): Observable<boolean> {
    return this.http.put<boolean>(this.serverUrl + 'id/' + userId + '/friend/add/' + friendId, {})
      .map((json: any) => json.data);
  }

  public DeleteFriend(userId: string, friendId: string): Observable<boolean> {
    return this.http.delete<boolean>(this.serverUrl + 'id/' + userId + '/friend/delete/' + friendId, {})
      .map((json: any) => json.data);
  }

  public GetUserSubs(userID: string): Observable<Subs> {
    return this.http.get<Subs>(this.serverUrl + 'id/' + userID + '/sub/place/list')
      .map((json: any) => new Subs(
        json.data.results
      ));
  }

  public SubscribeToPlace(userID: string, placeID: string): Observable<boolean> {
    return this.http.put<boolean>(this.serverUrl + 'id/' + userID + '/sub/place/add/' + placeID, {})
      .map((json: any) => json.data);
  }

  public UnsubscribePlace(userID: string, placeID: string): Observable<boolean> {
    return this.http.delete<boolean>(this.serverUrl + 'id/' + userID + '/sub/place/delete/' + placeID)
      .map((json: any) => json.data);
  }
}
