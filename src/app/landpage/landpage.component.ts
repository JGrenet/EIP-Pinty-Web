import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { AuthService as AuthS } from '../core/guard/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HeaderService } from '../core/header/header.service';

@Component({
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.scss']
})

export class LandPageComponent implements OnInit, OnDestroy {

  private user: SocialUser;
  private loggedIn: boolean;
  private action = '';

  socialConnectSubscription: Subscription;
  routeParamSubscription: Subscription;
  apiLoginSubscription: Subscription;

  constructor(private route: ActivatedRoute, private authService: AuthService,
              private _auth: AuthS, private router: Router, private headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.setSectionTab('login');
    this.socialConnectSubscription = this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.routeParamSubscription = this.route.params.subscribe((params: Params) => this.action = params['action']);
    if (this.action === 'disconnect') {
      this._auth.disconnect(false);
    }
  }


  signIn(provider: string) {
    switch (provider) {
      case 'facebook':
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
          if (this.loggedIn) {
            this.signInWithProviders(provider);
          }
        });
        break;
      case 'google':
        // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        alert('Non implementé');
        break;
    }
  }

  signInWithProviders(provider: string) {
    this.apiLoginSubscription = this._auth.ApiLogin(provider, this.user.authToken, '')
      .subscribe( res => {
        this._auth.connect(provider, this.user.authToken, res.id, res.apiKey, this.user);
        if (res.created === true) {
          this.router.navigate(['first_connection']);
        }
        this.router.navigate([this._auth.redirectUrl]);
      });
  }

  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
    this.socialConnectSubscription.unsubscribe();
    if (this.apiLoginSubscription !== undefined) {
      this.apiLoginSubscription.unsubscribe();
    }
  }
}
