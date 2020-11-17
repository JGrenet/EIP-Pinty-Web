import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { UserSessionService } from './userSession.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardAdminService implements CanLoad, CanActivate {

  constructor(public sessionService: UserSessionService, public auth: AuthService, public router: Router) {

  }

 async canLoad() {
   const userRole = this.sessionService.getUserInfo().getValue();
   if (this.sessionService.isAuthenticated() === true && userRole.role === 'ADMIN') {
     return true;
   } else if (this.sessionService.isAuthenticated() === undefined) {
     const returnValue = await this.auth.autoConnect();
     if (returnValue === false) {
       this.auth.redirectUrl = 'admin';
       this.router.navigate(['login']);
       return false;
     }
     return returnValue;
   }
   return false;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userRole = this.sessionService.getUserInfo().getValue();
    if (this.sessionService.isAuthenticated() === true && userRole.role === 'ADMIN') {
      return true;
    } else if (this.sessionService.isAuthenticated() === undefined) {
      const returnValue = await this.auth.autoConnect();
      if (returnValue === false) {
        this.auth.redirectUrl = state.url;
        this.router.navigate(['login']);
        return false;
      }
      return returnValue;
    }
    return false;
  }
}
