import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {SearchService} from '../core/Api/search.service';
import {PlaceResult} from '../core/Api/Model/PlaceResult';
import {Subscription} from 'rxjs/Subscription';
import {HeaderService} from '../core/header/header.service';
import {PlacesAround, PlaceAround} from '../core/Api/Model/PlacesAround';
import {PlaceService} from '../core/Api/place.service';
import {UserProfile} from '../core/Api/Model/UserProfile';
import {UserSessionService} from '../core/guard/userSession.service';

@Component({
  templateUrl: './aroundMe.component.html',
  styleUrls: ['./aroundMe.component.scss']
})

export class AroundMeComponent implements OnInit, OnDestroy {
  searchType: string;
  searchInput: string;

  placesSearch = false;

  placesLimit = 5;

  placesAroundSubscription: Subscription;
  signedInUserSubscription: Subscription;

  signedInUser: UserProfile;
  placesAround: PlacesAround;
  filteredPlaces: PlaceAround[];

  placesLoaded: Promise<boolean>;

  type: string;

  latitude: number;
  longitude: number;

  constructor(private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              private searchService: SearchService, private headerService: HeaderService, private placeService: PlaceService,
              private sessionService: UserSessionService) {
    iconRegistry
      .addSvgIcon(
        'full_star',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/full_star.svg'))
      .addSvgIcon(
        'half_star',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/full_star.svg'))
      .addSvgIcon(
        'star',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/star.svg'))
      .addSvgIcon(
        'palette',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/palette.svg'))
      .addSvgIcon(
        'bar',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/bar.svg'));

  }

  ngOnInit() {
    this.headerService.setSectionTab('around');
    this.type = 'tous';

    this.signedInUserSubscription = this.sessionService.getUserInfo()
      .subscribe(res => {
        this.signedInUser = res;
      });
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.loadPlacesAround();
    });
  }

  loadPlacesAround() {
    this.placesSearch = true;
    this.placesAroundSubscription = this.placeService.GetPlacesAround(this.longitude, this.latitude, 200, 'all')
      .subscribe(res => {
        for (let i = 0; i < res.results.length; i++) {
          if (res.results[i].image === undefined || res.results[i].image === null) {
            res.results[i].image = './assets/image/void/void_place_picture_medium.png';
          }
        }
        console.log(res);
        this.placesAround = res;
        console.log(this.placesAround);
        this.filteredPlaces = this.placesAround.results;
        this.placesLoaded = Promise.resolve(true);
      });
  }

  switchType(type: string) {
    this.type = type;
    switch (this.type) {
      case 'tous':
        this.filteredPlaces = this.placesAround.results;
        break;
      default:
        this.filteredPlaces = this.placesAround.results.filter((place) => place.types === type);
        break;
    }
  }

  ngOnDestroy() {
    if (this.placesAroundSubscription !== undefined) {
      this.placesAroundSubscription.unsubscribe();
    }
  }
}
