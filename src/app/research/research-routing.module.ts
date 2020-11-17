import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/guard/auth-guard.service';
import { ResearchComponent } from './research.component';

const routes = [
  { path: ':type/:input', component: ResearchComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class ResearchRoutingModule {

}
