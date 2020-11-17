import {Injectable} from '@angular/core';
import {SocialUser} from 'angularx-social-login';
import {UserProfile} from '../Api/Model/UserProfile';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserSessionService {

  private authentificated = undefined;
  private pintyId: string;
  private apiKey: string;
  private socialUser: SocialUser;
  private userInfo = new BehaviorSubject<UserProfile>({
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    city: '',
    description: '',
    image: '',
    role: '',
    gender: '',
    birthday: 0,
    email: '',
    accessType: '',
    friends: [],
    subPlaces: [],
    latitude: 0,
    longitude: 0
  });

  setUserInfo(userInfo: UserProfile) {
    this.userInfo.next(userInfo);
  }

  getUserInfo(): BehaviorSubject<UserProfile> {
    return this.userInfo;
  }

  public isAuthenticated(): boolean {
    return this.authentificated;
  }

  public setAuthenticated(_state: boolean): void {
    this.authentificated = _state;
  }

  public setPintyId(_pintyID: string): void {
    this.pintyId = _pintyID;
  }

  public getPintyId(): string {
    return this.pintyId;
  }

  public setApiKey(_apiKey: string): void {
    this.apiKey = _apiKey;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public setSocialUser(socialUser: SocialUser): void {
    this.socialUser = socialUser;
  }

  public getSocialUser(): SocialUser {
    return this.socialUser;
  }
}
