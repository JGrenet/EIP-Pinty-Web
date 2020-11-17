import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../core/header/header.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import {UserSessionService} from '../core/guard/userSession.service';
import {UserProfile} from '../core/Api/Model/UserProfile';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  selectedTab: string;
  userProfile: UserProfile;

  constructor(private headerService: HeaderService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              public router: Router, private user: UserSessionService) {
    iconRegistry
      .addSvgIcon(
        'event',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/event.svg'))
      .addSvgIcon(
        'media',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/photo.svg'))
      .addSvgIcon(
        'review',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/edit.svg'))
      .addSvgIcon(
        'feedback',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/big_assignment.svg'))
      .addSvgIcon(
        'message',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/message.svg'))
      .addSvgIcon(
        'place',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/place.svg'))
      .addSvgIcon(
        'user',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/black_account.svg'))
      .addSvgIcon(
        'home',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/home.svg'));
  }

  ngOnInit() {
    this.headerService.setSectionTab('admin');
    this.tabSelector(this.router.url);
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.tabSelector(res.url);
      }
    });
    this.user.getUserInfo().subscribe((res) => {
      this.userProfile = res;
    });
  }

  private tabSelector(url: string) {
    switch (url) {
      case '/admin/home':
        this.selectedTab = 'home';
        break;
      case '/admin/users':
        this.selectedTab = 'users';
        break;
      case '/admin/places':
        this.selectedTab = 'places';
        break;
      case '/admin/feedbacks':
        this.selectedTab = 'feedbacks';
        break;
      case '/admin/reviews':
        this.selectedTab = 'reviews';
        break;
      default :
        this.selectedTab = 'home';
        break;
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
