import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatIconRegistry } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserSessionService } from '../../../core/guard/userSession.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FeedbackService } from '../../../core/Api/feedback.service';

@Component({
  templateUrl: './feedbackPopup.component.html',
  styleUrls: ['./feedbackPopup.component.scss']
})

export class FeedbackPopupComponent implements OnInit, OnDestroy {

  uploadedImgs: ImgUploaded[];
  sent = false;

  // Loading
  popupLoaded = false;

  // TextArea
  Form: FormGroup;

  createFeedbackSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<FeedbackPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private feedbackService: FeedbackService,
              private sessionService: UserSessionService) {
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
    this.popupLoaded = true;
    this.Form = new FormGroup({
      feedbackObject: new FormControl(),
      feedbackMessage: new FormControl()
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

  publishFeedback() {
    if (this.Form.value.reviewMessage !== '') {
      this.sent = true;
      this.createFeedbackSubscription = this.feedbackService.CreateFeedback(this.sessionService.getPintyId(),
        this.Form.value.feedbackObject, this.Form.value.feedbackMessage, this.uploadedImgs.filter(img => img.visible)
          .map(img => img.b64)).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

  closePopup() {
    this.dialogRef.close(null);
  }

  ngOnDestroy() {
    if (this.createFeedbackSubscription !== undefined) {
      this.createFeedbackSubscription.unsubscribe();
    }
  }
}

class ImgUploaded {
  constructor(public id: number, public visible: boolean, public src: SafeResourceUrl, public b64: string, public size: number) {
  }
}
