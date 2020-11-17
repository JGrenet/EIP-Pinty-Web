import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MapComponent } from './map.component';
import { AuthGuardService } from '../core/guard/auth-guard.service';

const routes = [
  { path: '', component: MapComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class MapRoutingModule {}
