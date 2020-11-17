import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserProfileComponent } from './userProfile.component';

import { AuthGuardService } from '../core/guard/auth-guard.service';

const routes = [
    { path: ':id', component: UserProfileComponent, canActivate: [AuthGuardService]},
    { path: ':panel/:id', component: UserProfileComponent, canActivate: [AuthGuardService]}
  ];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class UserProfileRoutingModule {}
