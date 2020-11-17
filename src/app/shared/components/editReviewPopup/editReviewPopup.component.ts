import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatIconRegistry } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReviewService } from '../../../core/Api/review.service';
import { UserSessionService } from '../../../core/guard/userSession.service';
import { PlaceService } from '../../../core/Api/place.service';
import { PlaceInfo } from '../../../core/Api/Model/PlaceInfo';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './editReviewPopup.component.html',
  styleUrls: ['./editReviewPopup.component.scss']
})

export class EditReviewPopupComponent implements OnInit, OnDestroy {

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

  constructor(public dialogRef: MatDialogRef<EditReviewPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
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
      this.placeInfo = res;
      this.popupLoaded = true;
      this.popupSpinner = 'stop';
    });

    this.Form = new FormGroup({
      reviewMessage: new FormControl()
    });
  }

  setNote(note: number) {
    this.reviewNote = note;
  }

  editReview() {
    if (this.Form.value.reviewMessage !== '') {
      this.sent = true;
      this.createReviewSubscription = this.reviewService.EditReview(this.data.reviewId, this.sessionService.getPintyId(),
        this.reviewNote, this.Form.value.reviewMessage).subscribe(res => {
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
