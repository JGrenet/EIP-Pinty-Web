import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatIconRegistry } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/Api/user.service';
import { UserSessionService } from '../../../core/guard/userSession.service';
import { SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './firstConnectionPopup.component.html',
  styleUrls: ['./firstConnectionPopup.component.scss'],
  animations: [
    trigger('swapPanel', [
      state('leftPart', style({transform: 'translateX(0)'})),
      state('rightPart', style({transform: 'translateX(calc(-100% - 40px))'})),

      transition('leftPart <=> rightPart', animate(500))
    ])
  ]
})

export class FirstConnectionPopupComponent implements OnInit, OnDestroy {

  prefilledInformations: SocialUser;
  visiblePanel = 'leftPart';
  sended = false;

  img_thumbnail: SafeResourceUrl = './assets/image/void/void_profile_picture_medium.png';
  base64_img = '';

  leftPartForm: FormGroup;
  rightPartForm: FormGroup;

  updateUserSubscription: Subscription;

  dayTab = Array.from(Array(31).keys(), n => {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  });
  monthTab = Array.from(Array(11).keys(), n => {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  });
  yearTab = Array.from(Array(119).keys(), n => n + 1900).reverse();
  gender = 'male';

  constructor(private dialogRef: MatDialogRef<FirstConnectionPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private fb: FormBuilder, private userService: UserService,
              private sessionService: UserSessionService) {
    iconRegistry
      .addSvgIcon(
        'dl',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/dl.svg'));
      this.prefilledInformations = this.sessionService.getSocialUser();
  }

  ngOnInit() {
    this.createForms();

    if (this.prefilledInformations != null) {
      this.leftPartForm.patchValue({
        lname: this.prefilledInformations.lastName,
        fname: this.prefilledInformations.firstName,
        email: this.prefilledInformations.email
      });
      this.rightPartForm.patchValue({
        pseudo: this.prefilledInformations.name,
      });

      this.loadRemotePP();
    }
  }

  createForms() {
    this.leftPartForm = this.fb.group({
      lname: ['', Validators.required],
      fname: ['', Validators.required],
      email: ['', Validators.email],
      birthDate: this.fb.group({
        day: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required]
      })
    });
    this.rightPartForm = this.fb.group({
      pp: '',
      pseudo: ['', Validators.required],
      city: '',
      bio: ''
    });
  }

  swapGender(_gender: string) {
     this.gender = _gender;
  }

  showRightPart() {
    if (this.leftPartForm.status === 'VALID') {
      this.visiblePanel = 'rightPart';
    }
  }

  onFileChanged(event: any) {
    if (event.target.files[0].size < 16000000) {
      const reader = new FileReader();
      reader.onload = () => {
        this.img_thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result);
        this.base64_img = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      alert('L\'image est trop lourde (>16mb)');
    }
  }

  loadRemotePP() {
    if (this.prefilledInformations && this.prefilledInformations.photoUrl !== '' && this.prefilledInformations.photoUrl !== undefined) {
      const request = new XMLHttpRequest();
      request.open('GET', this.prefilledInformations.photoUrl, true);
      request.responseType = 'blob';

      request.onload = () => {
        const reader = new FileReader();
        reader.readAsDataURL(request.response);
        reader.onload = (e: any) => {
          this.img_thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result);
          this.base64_img = reader.result;
        };
      };

      request.send();
    }
  }

  submit() {
    if (this.rightPartForm.status === 'VALID') {
      this.sended = true;
      // Creating the timestamp value of birthday
      const birthDate = new Date(this.leftPartForm.get('birthDate').get('year').value,
        this.leftPartForm.get('birthDate').get('month').value,
        this.leftPartForm.get('birthDate').get('day').value);

      this.updateUserSubscription = this.userService.UpdateUserProfile(this.sessionService.getPintyId(), {
        username: this.rightPartForm.get('pseudo').value,
        firstname: this.leftPartForm.get('fname').value,
        lastname: this.leftPartForm.get('lname').value,
        image: this.base64_img,
        gender: this.gender,
        birthday: birthDate.getTime(),
        email: this.leftPartForm.get('email').value,
        city: this.rightPartForm.get('city').value,
        description: this.rightPartForm.get('bio').value
      }).subscribe((res: any) => {
          this.sessionService.setUserInfo(res);
          this.dialogRef.close();
      });
    }
  }

  ngOnDestroy() {
    if (this.updateUserSubscription !== undefined) {
      this.updateUserSubscription.unsubscribe();
    }
  }
}
