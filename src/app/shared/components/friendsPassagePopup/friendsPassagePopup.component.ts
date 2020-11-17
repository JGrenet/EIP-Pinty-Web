import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatIconRegistry } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserSessionService } from '../../../core/guard/userSession.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './friendsPassagePopup.component.html',
  styleUrls: ['./friendsPassagePopup.component.scss']
})

export class FriendsPassagePopupComponent implements OnInit, OnDestroy {

  sent = false;

  // Loading
  popupLoaded = false;

  // TextArea
  Form: FormGroup;

  createFeedbackSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<FriendsPassagePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private sessionService: UserSessionService) {
    iconRegistry
      .addSvgIcon(
        'close',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/close.svg'))
      .addSvgIcon(
        'dl',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/dl.svg'));
  }

  ngOnInit() {
    this.popupLoaded = true;
    this.Form = new FormGroup({
      feedbackObject: new FormControl(),
      feedbackMessage: new FormControl()
    });
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
