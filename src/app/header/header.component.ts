import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService as AuthS } from '../core/guard/auth.service';
import { UserSessionService } from '../core/guard/userSession.service';
import { UserProfile } from '../core/Api/Model/UserProfile';
import { Subscription } from 'rxjs/Subscription';
import { HeaderService } from '../core/header/header.service';
import { AuthService } from 'angularx-social-login';
import { FeedbackPopupComponent } from '../shared/components/feedbackPopup/feedbackPopup.component';
import { SearchService } from '../core/Api/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlaceResult } from '../core/Api/Model/PlaceResult';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { ProfileResult } from '../core/Api/Model/ProfileResult';
import {PlacesAround} from '../core/Api/Model/PlacesAround';
import {PlaceService} from '../core/Api/place.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [SearchService]
})

export class HeaderComponent implements OnInit, OnDestroy {

  dashboardTab = false;
  aroundTab = false;

  shouldDisplay = true;

  userMenu = false;

  results = false;

  placesResult = new PlaceResult('', []);
  profilesResult = new ProfileResult([]);

  userProfile: UserProfile;

  placesAround: PlacesAround;

  userInfoSubject: Subscription;
  filterForm: FormGroup;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public auth: AuthS, private router: Router,
              public userSession: UserSessionService, public activatedRoute: ActivatedRoute, public dialog: MatDialog,
              public headerService: HeaderService, public authService: AuthService, private fb: FormBuilder,
              private searchService: SearchService, private placeService: PlaceService) {
    iconRegistry
      .addSvgIcon(
        'search',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/search.svg'))
      .addSvgIcon(
        'arrow-down',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/arrow-down.svg'))
      .addSvgIcon(
        'menu',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/ic_menu.svg'))
      .addSvgIcon(
        'account_box',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/account_box.svg'))
      .addSvgIcon(
        'power',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/power.svg'))
      .addSvgIcon(
        'admin_user',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/admin_user.svg'))
      .addSvgIcon(
        'compass',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/compass.svg'));
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      term: [''],
    });
    this.onFormChanges();
    this.userInfoSubject = this.userSession.getUserInfo()
      .subscribe(res => {
        this.userProfile = res;
      });
    this.headerService.getSectionTab().subscribe(section => {
      if (section === undefined || section === '') {
        this.dashboardTab = true;
        this.aroundTab = false;
      } else {
        switch (section) {
          case 'around':
            this.aroundTab = true;
            this.dashboardTab = false;
            break;
          case 'login':
            this.shouldDisplay = false;
            break;
        }
      }
      this.setVisible(section);
    });
  }

  private loadResults() {
    if (this.filterForm.value.term !== '') {
      this.results = true;
      this.searchService.SearchPlace(this.filterForm.value.term)
        .subscribe(res => {
          for (let i = 0; i < res.results.length; i++) {
            if (res.results[i].image === undefined || res.results[i].image === null) {
              res.results[i].image = './assets/image/void/void_place_picture_medium.png';
            }
          }
          this.placesResult = res;
        });
      this.searchService.SearchProfile(this.filterForm.value.term)
        .subscribe(res => {
          for (let i = 0; i < res.results.length; i++) {
            if (res.results[i].image === undefined || res.results[i].image === null) {
              res.results[i].image = './assets/image/void/void_place_picture_medium.png';
            }
          }
          this.profilesResult = res;
        });
    } else {
      this.results = false;
    }
  }

  private onFormChanges() {
    this.filterForm.get('term').valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(() => {
        this.loadResults();
      });
  }

  private setVisible(value: string) {
    if (value === 'login' || value === 'admin') {
      this.shouldDisplay = false;
    } else {
      this.shouldDisplay = true;
    }
  }

  public disconnect() {
    this.auth.disconnect(true);
  }

  onSearch(search) {
    this.router.navigate(['/research', 'all', search]);
    this.hideResults();
  }

  alertNotImplemented() {
    alert('Non implementé');
  }

  writeFeedback() {
    this.dialog.open(FeedbackPopupComponent, {
      width: '400px',
      height: 'auto',
      disableClose: false
    });
  }

  toggleUserMenu() {
    this.userMenu = !this.userMenu;
  }

  deco() {
    this.authService.signOut()
      .then(() => {
        this.router.navigate(['login', 'disconnect']);
      });
  }

  hideResults() {
    this.results = false;
  }

  aroundMeDebug() {
    console.log('Here');
    this.placeService.GetPlacesAround(2.3884016999999997, 48.9107328, 2000, 'all')
      .subscribe(res => {
        this.placesAround = res;
      });
    console.log(this.placesAround);
  }

  ngOnDestroy() {
    this.userInfoSubject.unsubscribe();
  }
}
