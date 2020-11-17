import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserSessionService } from './userSession.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConnectResponse } from '../Api/Model/ConnectResponse';
import { environment } from '../../../environments/environment';
import { SocialUser } from 'angularx-social-login';
import { UserService } from '../Api/user.service';


@Injectable()
export class AuthService {
  serverUrl: string;
  public redirectUrl = '';

  constructor(private cs: CookieService, private router: Router, private sessionService: UserSessionService,
              private http: HttpClient, private userService: UserService) {
    this.serverUrl = environment.serverUrl;
  }

  public ApiLogin(provider: string, accessToken: string, refreshToken: string): Observable<ConnectResponse> {
    const suburl = (provider === 'facebook') ? 'oauth/facebook/login' : 'oauth/google/login';

    const params = new HttpParams().set('accessToken', accessToken);
    if (provider === 'google') {
      params.set('refreshToken', refreshToken);
    }

    return this.http.post<ConnectResponse>(this.serverUrl + suburl, params)
      .map( (json: any) => new ConnectResponse(
        json.data.id,
        json.data.socialId,
        json.data.apiKey,
        json.data.created)
      );
  }

  public async connect(provider: string, socialToken: string, _pintyId: string, _apiKey: string, socialUser: SocialUser = null) {

    // Setting the cookie for autoconnect
    this.sessionService.setAuthenticated(true);
    this.cs.set('socialToken', provider + ';' + socialToken, new Date().setMonth(new Date().getMonth() + 2));

    // Setting the connection informations
    this.sessionService.setPintyId(_pintyId);
    this.sessionService.setApiKey(_apiKey);
    this.sessionService.setSocialUser(socialUser);

    // Get User Informations
    await this.userService.GetUserProfile(_pintyId).toPromise().then((res) => {
      this.sessionService.setUserInfo(res);
    });
  }

  public disconnect(needRedirect: boolean) {
    this.cs.delete('socialToken');
    this.sessionService.setAuthenticated(false);
    if (needRedirect) {
      this.router.navigate(['login']);
    }
  }

  public async autoConnect() {
    if (this.cs.check('socialToken') === true) {
      const cookieString = this.cs.get('socialToken');
      const logArray = cookieString.split(';');
      const response = <ConnectResponse>await this.ApiLogin(logArray[0], logArray[1], '').toPromise()
        .catch(() => false);
      await this.connect(logArray[0], logArray[1], response.id, response.apiKey);
      return true;
    }
    return false;
  }
}
