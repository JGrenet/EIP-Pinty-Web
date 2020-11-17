import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {Router} from '@angular/router';
import {FirstConnectionPopupComponent} from '../shared/components/firstConnectionPopup/firstConnectionPopup.component';
import {HeaderService} from '../core/header/header.service';
import {Subscription} from 'rxjs/Subscription';
import {UserSessionService} from '../core/guard/userSession.service';
import { UserService } from '../core/Api/user.service';
import { IaService } from '../core/Api/ia.service';
import { UserProfile } from '../core/Api/Model/UserProfile';
import { Suggestion, Suggestions} from '../core/Api/Model/Suggestion';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

// TODO Faire Animation entre les Page
// TODO Fix le bug de la sticky bar où le dernier element n'est pas sticky

export class DashBoardComponent implements OnInit {

  signedInUserSubscription: Subscription;
  signedInUser: UserProfile;

  suggestionOfTheDaySubscription: Subscription;
  suggestionRatingSubscription: Subscription;

  suggestion: Suggestion = null;

  latitude: number;
  longitude: number;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router,
              private dialog: MatDialog, private headerService: HeaderService, private userService: UserService,
              private sessionService: UserSessionService, private  iaService: IaService) {
    iconRegistry
      .addSvgIcon(
        'full_star',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/full_star.svg'))
      .addSvgIcon(
        'star',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/star.svg'))
      .addSvgIcon(
        'half_star',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/half_star.svg'));
  }

  ngOnInit() {
    this.headerService.setSectionTab('');
    if (this.router.url === '/first_connection') {
      this.openFCPopup();
    }
    this.signedInUserSubscription = this.sessionService.getUserInfo()
      .subscribe(res => {
        this.signedInUser = res;
      });
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.onLoadSuggestion();
    });
  }

  openFCPopup() {
    setTimeout(() => {
      const FCPopup = this.dialog.open(FirstConnectionPopupComponent, {
        width: '400px',
        height: 'auto',
        disableClose: true
      });
    });
  }

  onLoadSuggestion() {
    this.suggestionOfTheDaySubscription = this.iaService.GetSuggestionOfTheDay(this.signedInUser.id, this.latitude, this.longitude)
      .subscribe((res: Suggestions) => {
        console.log('Suggestions', res);
        if (res) {
          this.suggestion = res.results[0];
        }
      });
  }

  onSuggestionRating(rating: number) {
    this.suggestionRatingSubscription = this.iaService.RateSuggestion(this.suggestion.id, this.signedInUser.id, rating)
      .subscribe((res) => {
        this.suggestion = null;
        this.onLoadSuggestion();
    });
  }
}
