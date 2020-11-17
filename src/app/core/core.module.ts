import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './guard/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService } from './guard/auth-guard.service';
import { UserService } from './Api/user.service';
import { MainInterceptor } from './interceptors/main.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserSessionService } from './guard/userSession.service';
import { ToasterModule } from 'angular2-toaster';
import { PlaceService } from './Api/place.service';
import { ReviewService } from './Api/review.service';
import { SearchService } from './Api/search.service';
import {FeedbackService} from './Api/feedback.service';
import { HeaderService } from './header/header.service';
import {AuthGuardAdminService} from './guard/auth-guard-admin.service';
import {IaService} from './Api/ia.service';
import {BackOfficeService} from './Api/backOffice.service';

@NgModule({
  imports: [CommonModule, ToasterModule.forRoot()],
  providers: [AuthService, AuthGuardService, AuthGuardAdminService, UserSessionService, CookieService, UserService, SearchService,
    HeaderService, {provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true}, PlaceService, ReviewService, BackOfficeService, FeedbackService, IaService],
  exports: [ToasterModule]
})

export class CoreModule {}
