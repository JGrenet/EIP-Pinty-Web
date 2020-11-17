import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { PlacesComponent } from './places/places.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AdminEditPopupComponent } from '../shared/components/adminEditPopup/adminEditPopup.component';
import { AdminDeletePopupComponent } from '../shared/components/adminDeletePopup/adminDeletePopup.component';

@NgModule({
  imports: [ SharedModule, AdminRoutingModule ],
  declarations: [ AdminComponent, HomeComponent, UsersComponent, PlacesComponent, FeedbacksComponent, ReviewsComponent ],
  entryComponents: [ AdminEditPopupComponent, AdminDeletePopupComponent]
})
export class AdminModule {}

