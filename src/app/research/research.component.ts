import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from '../core/Api/search.service';
import { ProfileResult } from '../core/Api/Model/ProfileResult';
import { PlaceResult } from '../core/Api/Model/PlaceResult';
import { Subscription } from 'rxjs/Subscription';
import {HeaderService} from '../core/header/header.service';

// TODO Animation de reload quand les parametres change

@Component({
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})

export class ResearchComponent implements OnInit, OnDestroy {
  searchType: string;
  searchInput: string;

  allSearch = false;
  placesSearch = false;
  profilesSearch = false;

  placesResult = new PlaceResult('', []);
  profilesResult = new ProfileResult([]);

  placesLimit = 5;
  profilesLimit = 5;

  routeParamSubscription: Subscription;
  searchPlaceAllSubscription: Subscription;
  searchUserAllSubscription: Subscription;
  searchPlaceSubscription: Subscription;
  searchUserSubscription: Subscription;

  constructor(private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              private searchService: SearchService, private headerService: HeaderService) {
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
    this.headerService.setSectionTab('research');
    this.routeParamSubscription = this.route.params.subscribe(params => {
      this.searchType = params['type'];
      this.searchInput = params['input'];

      switch (this.searchType) {
        case 'all':
          this.searchAll();
          break;
        case 'place':
          this.searchPlaces();
          break;
        case 'profile':
          this.searchProfiles();
          break;
      }
    });
  }

  searchAll() {
    this.allSearch = true;
    this.placesSearch = true;
    this.profilesSearch = true;
    this.placesLimit = 5;
    this.profilesLimit = 5;
    this.searchPlaceAllSubscription = this.searchService.SearchPlace(this.searchInput).subscribe(res => {
      for (let i = 0; i < res.results.length; i++) {
        if (res.results[i].image === undefined || res.results[i].image === null) {
          res.results[i].image = './assets/image/void/void_place_picture_medium.png';
        }
      }
      this.placesResult = res;
    });
    this.searchUserAllSubscription = this.searchService.SearchProfile(this.searchInput).subscribe(res => {
      for (let i = 0; i < res.results.length; i++) {
        if (res.results[i].image === undefined || res.results[i].image === null) {
          res.results[i].image = './assets/image/void/void_place_picture_medium.png';
        }
      }
      this.profilesResult = res;
    });
  }

  searchPlaces() {
    this.allSearch = false;
    this.placesSearch = true;
    this.profilesSearch = false;
    this.searchPlaceSubscription = this.searchService.SearchPlace(this.searchInput).subscribe(res => {
      for (let i = 0; i < res.results.length; i++) {
        if (res.results[i].image === undefined || res.results[i].image === null) {
          res.results[i].image = './assets/image/void/void_place_picture_medium.png';
        }
      }
      this.placesResult = res;
    });
  }

  searchProfiles() {
    this.allSearch = false;
    this.placesSearch = false;
    this.profilesSearch = true;
    this.searchUserSubscription = this.searchService.SearchProfile(this.searchInput).subscribe(res => {
      for (let i = 0; i < res.results.length; i++) {
        if (res.results[i].image === undefined || res.results[i].image === null) {
          res.results[i].image = './assets/image/void/void_place_picture_medium.png';
        }
      }
      this.profilesResult = res;
    });
  }

  switchSearch(search: string) {
    switch (search) {
      case 'all':
        this.allSearch = true;
        this.placesSearch = true;
        this.profilesSearch = true;
        this.placesLimit = 5;
        this.profilesLimit = 5;
        break;
      case 'places':
        this.allSearch = false;
        this.placesSearch = true;
        this.profilesSearch = false;
        this.placesLimit = 99;
        break;
      case 'profiles':
        this.allSearch = false;
        this.placesSearch = false;
        this.profilesSearch = true;
        this.profilesLimit = 99;
        break;
    }
  }

  setListResultMargin() {
    if (!this.allSearch) {
      return '1rem';
    }
    return '0';
  }

  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
    if (this.searchUserSubscription !== undefined) {
      this.searchUserSubscription.unsubscribe();
    }
    if (this.searchUserAllSubscription !== undefined) {
      this.searchUserAllSubscription.unsubscribe();
    }
    if (this.searchPlaceSubscription !== undefined) {
      this.searchPlaceSubscription.unsubscribe();
    }
    if (this.searchPlaceAllSubscription !== undefined) {
      this.searchPlaceAllSubscription.unsubscribe();
    }
  }
}
