import { NgModule } from '@angular/core';

/* Shared Module */
import { SharedModule } from '../shared/shared.module';

import { UserProfileRoutingModule } from './userProfile-routing.module';

/* Module's Components */
import { UserProfileComponent } from './userProfile.component';
import { EditProfilePopupComponent } from '../shared/components/editProfilePopup/editProfilePopup.component';

@NgModule({
  imports: [SharedModule, UserProfileRoutingModule],
  declarations: [UserProfileComponent],
  entryComponents: [EditProfilePopupComponent]
})

export class UserProfileModule {}
