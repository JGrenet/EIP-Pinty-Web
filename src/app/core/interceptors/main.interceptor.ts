import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserSessionService } from '../guard/userSession.service';
import { catchError, retry} from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(public sessionService: UserSessionService, public toasterService: ToasterService, public router: Router) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.toasterService.pop('error', 'Client-side error', 'Une erreur est survenue. Veuillez réessayer plus tard.');
      console.error('An error occurred:', error.error.message);
    } else {
      switch (error.status) {
        case 400:
          this.toasterService.pop('error', 'Serveur-side error', '[400] Bad Request');
          break;
        case 401:
          this.toasterService.pop('error', 'Serveur-side error', '[401] Unauthorized');
          this.router.navigate(['login', 'disconnect']);
          break;
        case 403:
          this.toasterService.pop('error', 'Serveur-side error', '[403] Forbidden');
          this.router.navigate(['/']);
          break;
        case 404:
          // TODO Create 404 error page
          this.toasterService.pop('error', 'Serveur-side error', '[404] Not Found');
          //this.router.navigate(['error/404']);
          break;
        case 405:
          this.toasterService.pop('error', 'Serveur-side error', '[405] Method Not Allowed');
          this.router.navigate(['login', 'disconnect']);
          break;
        case 406:
          this.toasterService.pop('error', 'Serveur-side error', '[406] Not Acceptable');
          break;
        case 410:
          this.toasterService.pop('error', 'Serveur-side error', '[410] Gone');
          break;
        case 418:
          this.toasterService.pop('error', 'Serveur-side error', '[418] I\'m a teapot.');
          break;
        case 429:
          this.toasterService.pop('error', 'Serveur-side error', '[429] Too Many Requests');
          this.router.navigate(['login', 'disconnect']);
          break;
        case 500:
          this.toasterService.pop('error', 'Serveur-side error', '[500] Internal Server Error');
          break;
        case 503:
          this.toasterService.pop('error', 'Serveur-side error', '[503] Service Unavailable');
          this.router.navigate(['login', 'disconnect']);
          break;
        default:
          this.toasterService.pop('error', 'Serveur-side error', '[UNKNOWN] Unexpected error');
          this.router.navigate(['login', 'disconnect']);
          break;
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was:`);
      console.log(error.headers);
    }
    return new ErrorObservable('');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authentifiedReq = req;
    if (this.sessionService.isAuthenticated()) {
      authentifiedReq = req.clone({
        setHeaders: {
              'pinty_id': this.sessionService.getPintyId(),
              'pinty_key': this.sessionService.getApiKey()
            }
      });
    }

    return <any>next.handle(authentifiedReq)
      .pipe(
        retry(3),
        catchError(this.handleError.bind(this))
      );
  }
}
