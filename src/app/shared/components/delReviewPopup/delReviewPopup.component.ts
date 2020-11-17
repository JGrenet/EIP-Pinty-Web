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
  templateUrl: './delReviewPopup.component.html',
  styleUrls: ['./delReviewPopup.component.scss']
})

export class DelReviewPopupComponent implements OnInit, OnDestroy {

  sent = false;

  // Loading
  popupLoaded = false;
  popupSpinner = 'stop';

  // TextArea
  Form: FormGroup;

  createReviewSubscription: Subscription;
  getPlaceInfoSubscritpion: Subscription;

  constructor(public dialogRef: MatDialogRef<DelReviewPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private reviewService: ReviewService,
              private sessionService: UserSessionService, private placeService: PlaceService) {
    iconRegistry
      .addSvgIcon(
        'close',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/close.svg'));
  }

  ngOnInit() {
    this.popupSpinner = 'run';
    this.getPlaceInfoSubscritpion = this.placeService.GetPlaceInfo(this.data.placeId).subscribe(res => {
      if (res.image === undefined || res.image === null) {
        res.image = './assets/image/void/void_place_picture_medium.png';
      }
      this.popupLoaded = true;
      this.popupSpinner = 'stop';
    });

    this.Form = new FormGroup({
      reviewMessage: new FormControl()
    });
  }

  deleteReview() {
    if (this.Form.value.reviewMessage !== '') {
      this.sent = true;
      this.createReviewSubscription = this.reviewService.DeleteReview(this.data.reviewId).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
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
