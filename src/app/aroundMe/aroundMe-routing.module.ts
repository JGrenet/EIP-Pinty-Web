import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from '../core/guard/auth-guard.service';
import {AroundMeComponent} from './aroundMe.component';

const routes = [
  { path: '', component: AroundMeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class AroundMeRoutingModule {
}
