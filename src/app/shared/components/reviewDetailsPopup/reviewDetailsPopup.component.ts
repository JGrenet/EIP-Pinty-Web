import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconRegistry} from '@angular/material';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ReviewService} from '../../../core/Api/review.service';
import {UserSessionService} from '../../../core/guard/userSession.service';
import {PlaceService} from '../../../core/Api/place.service';
import {PlaceInfo} from '../../../core/Api/Model/PlaceInfo';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  templateUrl: './reviewDetailsPopup.component.html',
  styleUrls: ['./reviewDetailsPopup.component.scss']
})

export class ReviewDetailsPopupComponent implements OnInit, OnDestroy {

  uploadedImgs: ImgUploaded[];
  reviewNote = 1;
  placeInfo: PlaceInfo;
  sent = false;

  // Loading
  popupLoaded = false;
  popupSpinner = 'stop';

  // TextArea
  Form: FormGroup;

  createReviewSubscription: Subscription;
  getPlaceInfoSubscritpion: Subscription;

  constructor(public dialogRef: MatDialogRef<ReviewDetailsPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private reviewService: ReviewService,
              private sessionService: UserSessionService, private placeService: PlaceService) {
    iconRegistry
      .addSvgIcon(
        'close',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/close.svg'))
      .addSvgIcon(
        'dl',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/dl.svg'));
    this.uploadedImgs = [];
  }

  ngOnInit() {
    this.popupSpinner = 'run';
    this.getPlaceInfoSubscritpion = this.placeService.GetPlaceInfo(this.data.placeId).subscribe(res => {
      if (res.image === undefined || res.image === null) {
        res.image = './assets/image/void/void_place_picture_medium.png';
      }
      this.placeInfo = res;
      this.popupLoaded = true;
      this.popupSpinner = 'stop';
    });

    this.Form = new FormGroup({
      reviewMessage: new FormControl()
    });

    console.log(this.data.reviewMedias);
  }

  closePopup() {
    this.dialogRef.close(null);
  }

  ngOnDestroy() {
    this.getPlaceInfoSubscritpion.unsubscribe();
    if (this.createReviewSubscription !== undefined) {
      this.createReviewSubscription.unsubscribe();
    }
  }
}

class ImgUploaded {

  constructor(_id: number, _visible: boolean, _src: SafeResourceUrl, _b64: string, _size: number) {
    this.id = _id;
    this.visible = _visible;
    this.src = _src;
    this.b64 = _b64;
    this.size = _size;
  }

  id: number;
  visible: boolean;
  src: SafeResourceUrl;
  b64: string;
  size: number;
}
