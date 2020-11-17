import { NgModule } from '@angular/core';

/* Shared Module */
import { SharedModule } from '../shared/shared.module';


/* Module's Components */
import { PlaceProfileRoutingModule } from './placeProfile-routing.module';
import { PlaceProfileComponent } from './placeProfile.component';
import { WriteReviewPopupComponent } from '../shared/components/writeReviewPopup/writeReviewPopup.component';
import { EditReviewPopupComponent } from '../shared/components/editReviewPopup/editReviewPopup.component';
import { DelReviewPopupComponent } from '../shared/components/delReviewPopup/delReviewPopup.component';
import { ReviewDetailsPopupComponent } from '../shared/components/reviewDetailsPopup/reviewDetailsPopup.component';
import {FriendsPassagePopupComponent} from '../shared/components/friendsPassagePopup/friendsPassagePopup.component';

@NgModule({
  imports: [SharedModule, PlaceProfileRoutingModule],
  declarations: [PlaceProfileComponent],
  entryComponents: [WriteReviewPopupComponent, EditReviewPopupComponent, DelReviewPopupComponent, ReviewDetailsPopupComponent,
    FriendsPassagePopupComponent]
})

export class PlaceProfileModule {}
