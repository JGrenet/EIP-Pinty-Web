import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserSessionService } from './userSession.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public sessionService: UserSessionService, public router: Router, public auth: AuthService) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.sessionService.isAuthenticated() === undefined) {
      const returnValue = await this.auth.autoConnect();
      if (returnValue === false) {
        this.auth.redirectUrl = state.url;
        this.router.navigate(['login']);
        return false;
      }
      return returnValue;
    } else if (this.sessionService.isAuthenticated() === true) {
      return true;
    }
    return false;
  }
}
