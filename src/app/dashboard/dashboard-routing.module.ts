import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashBoardComponent } from './dashboard.component';
import { AuthGuardService } from '../core/guard/auth-guard.service';

const routes = [
  { path: '', component: DashBoardComponent, canActivate: [AuthGuardService]},
  { path: 'first_connection', component: DashBoardComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class DashboardRoutingModule {}

