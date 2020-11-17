import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AuthGuardService } from '../core/guard/auth-guard.service';
import { PlaceProfileComponent } from './placeProfile.component';

const routes = [
  { path: ':id', component: PlaceProfileComponent, canActivate: [AuthGuardService]},
  { path: ':panel/:id', component: PlaceProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class PlaceProfileRoutingModule {}
