import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatDialog, MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../core/Api/user.service';

import { UserProfile } from '../core/Api/Model/UserProfile';
import { Masonry } from 'ng-masonry-grid';
import { Reviews } from '../core/Api/Model/Reviews';
import { Subs } from '../core/Api/Model/Subs';
import { UserSessionService } from '../core/guard/userSession.service';
import { Subscription } from 'rxjs/Subscription';
import {HeaderService} from '../core/header/header.service';
import {EditProfilePopupComponent} from '../shared/components/editProfilePopup/editProfilePopup.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss']
})

export class UserProfileComponent implements OnInit, OnDestroy {

  // ID of the user of the page
  userId: string;
  isMe = false;
  isAbo: boolean;

  // Panel Boolean
  placeFollowedPanel: boolean;
  reviewPanel: boolean;

  // User Info
  userProfile: UserProfile;

  // Reviews
  reviews = new Reviews([]);

  // Place Followed
  placeFollowed = new Subs([]);

  // Page Loading
  pageLoaded = false;
  pageSpinner = 'stop';

  // Tab Loading
  tabSpinner = 'stop';

  // Masonry
  masonryInstance: Masonry;

  // SignInUserInfo
  signInUserInfo: UserProfile;

  public myOptions = {
    columnWidth: 260,
    gutter: 20,
    itemSelector: '.reviewItem',
    horizontalOrder: true
  };

  // Subscription
  signInUserSubscription: Subscription;
  paramsSubscription: Subscription;
  profileSubscription: Subscription;
  reviewSubscription: Subscription;
  subsSubscription: Subscription;
  subPlaceSubscription: Subscription;
  unsubPlaceSubscription: Subscription;

  constructor(private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router,
              private userService: UserService, public sessionService: UserSessionService, private headerService: HeaderService,
              private dialog: MatDialog) {
    iconRegistry
      .addSvgIcon(
        'pin',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/black_place.svg'))
      .addSvgIcon(
        'edit',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/edit.svg'));
  }

  onNgMasonryInit($event: Masonry) {
    this.masonryInstance = $event;
  }

  ngOnInit() {
    this.headerService.setSectionTab('user');
    this.pageSpinner = 'run';

    // Get URL parameters
    let panel: string;

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      panel = params['panel'];
      this.userId = params['id'];
    });
    if (this.userId === this.sessionService.getPintyId()) {
      this.isMe = true;
    }

    // Get the SignedIn User informations to get the friendlist
    this.signInUserSubscription = this.sessionService.getUserInfo()
      .subscribe(res => {
        this.signInUserInfo = res;
        if (this.signInUserInfo.friends.includes(this.userId)) {
          this.isAbo = true;
        } else {
          this.isAbo = false;
        }
      });

    // Loading the Profile Info from the page
    const profileObserver = {
      next: res => {
        this.userProfile = res;
        this.pageSpinner = 'stop';
        this.pageLoaded = true;
      }
    };
    if (!this.isMe) {
      this.profileSubscription = this.userService.GetUserPublicProfile(this.userId)
        .subscribe(profileObserver);
    } else {
      this.profileSubscription = this.userService.GetUserProfile(this.userId)
        .subscribe(profileObserver);
    }

    // Loading the correct Tab
    if (panel === undefined || panel === 'review') {
      this.reviewPanel = true;
      this.loadReviews();
    } else if (panel === 'placeFollowed') {
      this.placeFollowedPanel = true;
      this.loadFollowed();
    }
  }

  private loadReviews(): void {
    this.tabSpinner = 'run';
    this.reviewSubscription = this.userService.GetReviewsByUserId(this.userId)
      .subscribe(res => {
        for (let i = 0; i < res.results.length; i++) {
          if (res.results[i].place.image === undefined || res.results[i].place.image === null) {
            res.results[i].place.image = './assets/image/void/void_place_picture_medium.png';
          }
        }
        if (this.masonryInstance) {
          this.masonryInstance.setAddStatus('add');
        }
        this.reviews = res;
        this.tabSpinner = 'stop';
      });
  }

  private loadFollowed(): void {
    this.tabSpinner = 'run';
    this.subsSubscription = this.userService.GetUserSubs(this.userId)
      .subscribe(res => {
        for (let i = 0; i < res.results.length; i++) {
          res.results[i].subscribed = true;
          if (res.results[i].image === undefined || res.results[i].image === null) {
            res.results[i].image = './assets/image/void/void_place_picture_medium.png';
          }
        }
        this.placeFollowed = res;
        this.tabSpinner = 'stop';
      });
  }

  switchPanel(panel: string) {
    switch (panel) {
      case 'review':
        this.reviewPanel = true;
        this.placeFollowedPanel = false;
        this.reviews.results = [];
        this.loadReviews();
        break;
      case 'placeFollowed':
        this.reviewPanel = false;
        this.placeFollowedPanel = true;
        this.placeFollowed.results = [];
        this.loadFollowed();
        break;
    }
  }

  subPlace(item: number) {
    this.subPlaceSubscription = this.userService.SubscribeToPlace(this.sessionService.getPintyId(), this.placeFollowed.results[item].id)
      .subscribe(res => {
        if (res === true) {
          this.placeFollowed.results[item].subscribed = true;
        }
      });
  }

  unsubPlace(item: number) {
    this.unsubPlaceSubscription = this.userService.UnsubscribePlace(this.sessionService.getPintyId(), this.placeFollowed.results[item].id)
      .subscribe(res => {
        if (res === true) {
          this.placeFollowed.results[item].subscribed = false;
        }
      });
  }

  addFriend() {
    this.userService.AddNewFriend(this.sessionService.getPintyId(), this.userId)
      .subscribe(() => {
        this.signInUserInfo.friends.push(this.userId);
        this.sessionService.setUserInfo(this.signInUserInfo);
      });
  }

  removeFriend() {
    this.userService.DeleteFriend(this.sessionService.getPintyId(), this.userId)
      .subscribe(() => {
        this.signInUserInfo.friends = this.signInUserInfo.friends.filter(key => key !== this.userId);
        this.sessionService.setUserInfo(this.signInUserInfo);
      });
  }

  editProfile() {
    const dialogRef = this.dialog.open(EditProfilePopupComponent, {
      width: '400px',
      height: 'auto',
      data: {
        username: this.userProfile.username,
        firstname: this.userProfile.firstname,
        lastname: this.userProfile.lastname,
        image: this.userProfile.image,
        gender: this.userProfile.gender,
        birthday: this.userProfile.birthday,
        email: this.userProfile.email,
        city: this.userProfile.city,
        description: this.userProfile.description
      },
      disableClose: false
    });
    dialogRef.afterClosed()
      .subscribe((res: UserProfile) => {
        if (res !== undefined) {
          this.userProfile = res;
        }
    });
  }

  ngOnDestroy() {
    this.signInUserSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
    if (this.reviewSubscription !== undefined) {
      this.reviewSubscription.unsubscribe();
    }
    if (this.subsSubscription !== undefined) {
      this.subsSubscription.unsubscribe();
    }
    if (this.subPlaceSubscription !== undefined) {
      this.subPlaceSubscription.unsubscribe();
    }
    if (this.unsubPlaceSubscription !== undefined) {
      this.unsubPlaceSubscription.unsubscribe();
    }
  }
}
