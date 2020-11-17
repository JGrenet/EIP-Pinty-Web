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
  templateUrl: './writeReviewPopup.component.html',
  styleUrls: ['./writeReviewPopup.component.scss']
})

export class WriteReviewPopupComponent implements OnInit, OnDestroy {

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

  constructor(public dialogRef: MatDialogRef<WriteReviewPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
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
  }

  onFileChanged(event) {
    if (event.target.files[0].size < 16000000) {
      let totalsize = 0;
      if (this.uploadedImgs.length > 0) {
        totalsize = this.uploadedImgs.map(img => img.size).reduce((a, b) => a + b);
      }
      if (totalsize < 20000000) {
        const reader = new FileReader();
        reader.onload = () => {
          const newImg = new ImgUploaded(this.uploadedImgs.length + 1, true,
            this.sanitizer.bypassSecurityTrustResourceUrl(reader.result), reader.result, event.target.files[0].size);
          this.uploadedImgs.push(newImg);
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert('Le total des image est trop lourd (>20mb)');
      }
    } else {
      alert('L\'image est trop lourde (>16mb)');
    }
  }

  deleteUploadedImg(imgId: number) {
    this.uploadedImgs[imgId - 1].visible = false;
  }

  getVisibleImg() {
    return this.uploadedImgs.filter(img => img.visible).length;
  }

  setNote(note: number) {
    this.reviewNote = note;
  }

  writeReview() {
    if (this.Form.value.reviewMessage !== '') {
      this.sent = true;
      this.createReviewSubscription = this.reviewService.CreateReview(this.sessionService.getPintyId(), this.data.placeId,
        this.reviewNote, this.Form.value.reviewMessage, this.uploadedImgs.filter(img => img.visible)
      .map(img => img.b64)).subscribe(res => {
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
