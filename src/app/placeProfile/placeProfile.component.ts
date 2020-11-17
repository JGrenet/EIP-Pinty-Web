import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Masonry } from 'ng-masonry-grid';
import { Review, Reviews } from '../core/Api/Model/Reviews';
import { PlaceService } from '../core/Api/place.service';
import { PlaceInfo } from '../core/Api/Model/PlaceInfo';
import Media from '../core/Api/Model/Media';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { WriteReviewPopupComponent } from '../shared/components/writeReviewPopup/writeReviewPopup.component';
import { DelReviewPopupComponent } from '../shared/components/delReviewPopup/delReviewPopup.component';
import { EditReviewPopupComponent } from '../shared/components/editReviewPopup/editReviewPopup.component';
import { ReviewDetailsPopupComponent } from '../shared/components/reviewDetailsPopup/reviewDetailsPopup.component';
import { UserSessionService } from '../core/guard/userSession.service';
import { Subscription } from 'rxjs/Subscription';
import { UserProfile } from '../core/Api/Model/UserProfile';
import { UserService } from '../core/Api/user.service';
import { HeaderService } from '../core/header/header.service';
import {FriendsPassagePopupComponent} from '../shared/components/friendsPassagePopup/friendsPassagePopup.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './placeProfile.component.html',
  styleUrls: ['./placeProfile.component.scss']
})

// TODO Pas d'avis / pas de photo
// TODO Responsive de l'avis

export class PlaceProfileComponent implements OnInit, OnDestroy {

  placeId: string;
  signedInUserInfo: UserProfile;

  // Panel Boolean
  reviewPanel: boolean;
  newsPanel: boolean;
  eventPanel: boolean;
  mediaPanel: boolean;

  // Map Miniature
  mapMini: mapboxgl.Map;

  // Place Info
  placeProfile: PlaceInfo;
  isSub: boolean;

  // Reviews
  reviews = new Reviews([]);
  currentUserReview = false;
  reviewId: string;
  reviewMessage: string;
  reviewRating: number;

  // Media
  medias = new Media([]);

  // Page Loading
  pageLoaded = false;
  pageSpinner = 'stop';

  // Tab Loading
  tabSpinner = 'stop';

  // Masonry
  avisMasonryInstance: Masonry;

  public reviewsOptions = {
    columnWidth: 260,
    gutter: 20,
    itemSelector: '.reviewItem',
    horizontalOrder: true
  };

  mediaMasonryInstance: Masonry;

  public mediasOptions = {
    columnWidth: 260,
    gutter: 20,
    itemSelector: '.mediaItem',
    horizontalOrder: true
  };

  // Subscription
  signedInUserSubscription: Subscription;
  paramsSubscription: Subscription;
  placeInfoSubscription: Subscription;
  reviewSubscription: Subscription;
  mediaSubscription: Subscription;
  writeReviewPopupSubscription: Subscription;
  deleteReviewPopupSubscription: Subscription;
  subPlaceSubscription: Subscription;
  unsubPlaceSubscription: Subscription;


  constructor(private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router,
              public placeService: PlaceService, public dialog: MatDialog, private sessionService: UserSessionService,
              public userService: UserService, public headerService: HeaderService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    iconRegistry
      .addSvgIcon(
        'depot',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/chat.svg'))
      .addSvgIcon(
        'edit',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/edit.svg'))
      .addSvgIcon(
        'suppr',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/delete.svg'));
  }

  onNgMasonryInit($event: Masonry, masonrySelector: number) {
    switch (masonrySelector) {
      case 1:
        this.avisMasonryInstance = $event;
        break;
      case 2:
        this.mediaMasonryInstance = $event;
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.headerService.setSectionTab('place');
    this.pageSpinner = 'run';

    // Get URL parameters
    let panel: string;

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      panel = params['panel'];
      this.placeId = params['id'];
    });

    // Getting the signedInUser Informations
    this.signedInUserSubscription = this.sessionService.getUserInfo()
      .subscribe(res => {
        this.signedInUserInfo = res;
        if (this.signedInUserInfo.subPlaces.includes(this.placeId)) {
          this.isSub = true;
        } else {
          this.isSub = false;
        }
      });

    // Loading the Place Info from the page
    this.placeInfoSubscription = this.placeService.GetPlaceInfo(this.placeId)
      .subscribe(res => {
        if (res.image === undefined || res.image === null) {
          res.image = './assets/image/void/void_place_picture_medium.png';
        }
        if (res.openingHours.length > 0) {
          for (let i = 0; i < res.openingHours.length; i++) {
            res.openingHours[i] = res.openingHours[i].substring(res.openingHours[i].indexOf(':') + 1).trim();
          }
        }
        this.placeProfile = res;
        console.log(this.placeProfile.friends);
        this.pageSpinner = 'stop';
        this.pageLoaded = true;
        this.loadMap();
      });

    // Loading the correct Tab
    if (panel === undefined || panel === 'review') {
      this.reviewPanel = true;
      this.loadReviews();
    } else if (panel === 'media') {
      this.mediaPanel = true;
      this.loadMedias();
    }
  }

  private loadMap() {
    setTimeout(() => {
      this.mapMini = new mapboxgl.Map({
        container: 'placeInfoMap',
        style: 'mapbox://styles/mapbox/streets-v10',
        zoom: 14,
        center: [this.placeProfile.location[0], this.placeProfile.location[1]]
      });
      new mapboxgl.Marker().setLngLat([this.placeProfile.location[0], this.placeProfile.location[1]]).addTo(this.mapMini);
    }, 1000);
  }

  private loadReviews(): void {
    this.tabSpinner = 'run';
    this.reviewSubscription = this.placeService.GetReviewsByPlaceID(this.placeId)
      .subscribe(res => {
        for (let i = 0; i < res.results.length; i++) {
          if (res.results[i].author.pp === undefined || res.results[i].author.pp == null) {
            res.results[i].author.pp = './assets/image/void/void_profile_picture_medium.png';
          }
          if (res.results[i].author.id === this.signedInUserInfo.id) {
            this.currentUserReview = true;
            this.reviewId = res.results[i].id;
            this.reviewMessage = res.results[i].message;
            this.reviewRating = res.results[i].rating;
          }
        }
        if (this.avisMasonryInstance) {
          this.avisMasonryInstance.setAddStatus('add');
        }
        this.reviews = res;
        this.tabSpinner = 'stop';
      });
  }

  private loadMedias(): void {
    this.tabSpinner = 'run';
    this.mediaSubscription = this.placeService.GetMediasByPlaceID(this.placeId)
      .subscribe(res => {
        if (this.mediaMasonryInstance) {
          this.mediaMasonryInstance.setAddStatus('add');
        }
        this.medias = res;
        this.tabSpinner = 'stop';
      });
  }

  switchPanel(panel: string) {
    switch (panel) {
      case 'review':
        if (this.reviewPanel !== true) {
          this.reviewPanel = true;
          this.mediaPanel = false;
          this.reviews.results = [];
          this.loadReviews();
        }
        break;
      case 'media':
        if (this.mediaPanel !== true) {
          this.reviewPanel = false;
          this.mediaPanel = true;
          this.medias.results = [];
          this.loadMedias();
        }
        break;
    }
  }

  popupWriteReview() {
    const writeReviewPopup = this.dialog.open(WriteReviewPopupComponent, {
      width: '400px',
      height: 'auto',
      data: {
        placeId: this.placeId
      },
      disableClose: false
    });
    this.writeReviewPopupSubscription = writeReviewPopup.afterClosed().subscribe((reviewItem: Review) => {
      if (reviewItem != null) {
        reviewItem.author = {
          id: this.signedInUserInfo.id,
          name: this.signedInUserInfo.username,
          pp: this.signedInUserInfo.image
        };
        if (this.avisMasonryInstance) {
          this.avisMasonryInstance.setAddStatus('prepend');
          this.reviews.results.splice(0, 0, reviewItem);
          this.currentUserReview = true;
        }
      }
    });
  }

  popupEditReview() {
    const editReviewPopup = this.dialog.open(EditReviewPopupComponent, {
      width: '400px',
      height: 'auto',
      data: {
        placeId: this.placeId,
        reviewId: this.reviewId,
        reviewMessage: this.reviewMessage,
        reviewRating: this.reviewRating
      },
      disableClose: false
    });
    this.writeReviewPopupSubscription = editReviewPopup.afterClosed().subscribe((reviewItem: Review) => {
      if (reviewItem != null) {
        location.reload();
        /*reviewItem.author = {
          id: this.signedInUserInfo.id,
          name: this.signedInUserInfo.username,
          pp: this.signedInUserInfo.image
        };
        if (this.avisMasonryInstance) {
          this.avisMasonryInstance.setAddStatus('prepend');
          this.reviews.results.splice(0, 0, reviewItem);
        }*/
      }
    });
  }

  popupDeleteReview() {
    const delReviewPopup = this.dialog.open(DelReviewPopupComponent, {
      width: '400px',
      height: 'auto',
      data: {
        placeId: this.placeId,
        reviewId: this.reviewId
      },
      disableClose: false
    });
    this.deleteReviewPopupSubscription = delReviewPopup.afterClosed().subscribe((reviewItem: Review) => {
      if (reviewItem != null) {
        location.reload();
      }
    });
  }

  popupReviewDetails(index: number) {
    const detailsPopup = this.dialog.open(ReviewDetailsPopupComponent, {
      width: '400px',
      height: 'auto',
      data: {
        placeId: this.placeId,
        reviewId: this.reviews.results[index].id,
        reviewMessage: this.reviews.results[index].message,
        reviewRating: this.reviews.results[index].rating,
        reviewAuthor: this.reviews.results[index].author.name,
        reviewMedias: this.reviews.results[index].medias
      },
      disableClose: false
    });
  }

  popupFriendsPassage() {
    const friendsPassage = this.dialog.open(FriendsPassagePopupComponent, {
      width: '400px',
      height: 'auto',
      data: {
        friends: this.placeProfile.friends,
      },
      disableClose: false
    });
  }

  subPlace() {
    this.subPlaceSubscription = this.userService.SubscribeToPlace(this.sessionService.getPintyId(), this.placeId)
      .subscribe(() => {
        this.signedInUserInfo.subPlaces.push(this.placeId);
        this.sessionService.setUserInfo(this.signedInUserInfo);
      });
  }

  unsubPlace() {
    this.unsubPlaceSubscription = this.userService.UnsubscribePlace(this.sessionService.getPintyId(), this.placeId)
      .subscribe(() => {
        this.signedInUserInfo.subPlaces = this.signedInUserInfo.subPlaces.filter(key => key !== this.placeId);
        this.sessionService.setUserInfo(this.signedInUserInfo);
      });
  }

  openMap() {
    alert('Not Implemented');
  }

  ngOnDestroy() {
    this.signedInUserSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
    this.placeInfoSubscription.unsubscribe();
    if (this.reviewSubscription !== undefined) {
      this.reviewSubscription.unsubscribe();
    }
    if (this.mediaSubscription !== undefined) {
      this.mediaSubscription.unsubscribe();
    }
    if (this.writeReviewPopupSubscription !== undefined) {
      this.writeReviewPopupSubscription.unsubscribe();
    }
    if (this.deleteReviewPopupSubscription !== undefined) {
      this.deleteReviewPopupSubscription.unsubscribe();
    }
    if (this.subPlaceSubscription !== undefined) {
      this.subPlaceSubscription.unsubscribe();
    }
    if (this.unsubPlaceSubscription !== undefined) {
      this.unsubPlaceSubscription.unsubscribe();
    }
  }
}
