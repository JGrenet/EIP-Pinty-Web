import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RaterComponent } from './components/rater/rater.component';
import { DatePassedPipe } from './pipes/date-passed.pipe';
import { TypeChipComponent } from './components/typeChip/typeChip.component';
import { CompatComponent } from './components/compat/compat.component';
import { FriendPassageComponent } from './components/friendPassage/friendPassage.component';
import { WriteReviewPopupComponent } from './components/writeReviewPopup/writeReviewPopup.component';
import { EditReviewPopupComponent } from './components/editReviewPopup/editReviewPopup.component';
import { DelReviewPopupComponent } from './components/delReviewPopup/delReviewPopup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstConnectionPopupComponent } from './components/firstConnectionPopup/firstConnectionPopup.component';
import { RouterModule } from '@angular/router';
import { FeedbackPopupComponent } from './components/feedbackPopup/feedbackPopup.component';
import { EditProfilePopupComponent } from './components/editProfilePopup/editProfilePopup.component';
import { ReviewDetailsPopupComponent } from './components/reviewDetailsPopup/reviewDetailsPopup.component';
import { FriendsPassagePopupComponent } from './components/friendsPassagePopup/friendsPassagePopup.component';
import { AdminTableComponent } from './components/adminTable/adminTable.component';
import { AdminEditPopupComponent } from './components/adminEditPopup/adminEditPopup.component';
import { AdminDeletePopupComponent } from './components/adminDeletePopup/adminDeletePopup.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule, BsDropdownModule.forRoot(), NgMasonryGridModule],
  declarations: [SpinnerComponent, RaterComponent, DatePassedPipe, TypeChipComponent, CompatComponent,
    FriendPassageComponent, WriteReviewPopupComponent, FirstConnectionPopupComponent, AdminTableComponent, AdminEditPopupComponent,
    AdminDeletePopupComponent, DelReviewPopupComponent, FeedbackPopupComponent, EditProfilePopupComponent, ReviewDetailsPopupComponent,
    EditReviewPopupComponent, FriendsPassagePopupComponent],
  exports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule, NgMasonryGridModule, SpinnerComponent, RaterComponent,
    DatePassedPipe, TypeChipComponent, CompatComponent, FriendPassageComponent, WriteReviewPopupComponent, FirstConnectionPopupComponent,
    AdminTableComponent, AdminEditPopupComponent, AdminDeletePopupComponent, DelReviewPopupComponent, FeedbackPopupComponent,
    EditProfilePopupComponent, ReviewDetailsPopupComponent, EditReviewPopupComponent, FriendsPassagePopupComponent]
})

export class SharedModule {

}
