import { NgModule } from '@angular/core';

/* Shared Module */
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

/* Module's Components */
import { DashBoardComponent } from './dashboard.component';
import { FirstConnectionPopupComponent } from '../shared/components/firstConnectionPopup/firstConnectionPopup.component';
import { FeedbackPopupComponent } from '../shared/components/feedbackPopup/feedbackPopup.component';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashBoardComponent],
  entryComponents: [FirstConnectionPopupComponent, FeedbackPopupComponent]
})

export class DashboardModule {}
