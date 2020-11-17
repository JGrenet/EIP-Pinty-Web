import { NgModule } from '@angular/core';
import { LandPageComponent } from './landpage.component';
import { RouterModule } from '@angular/router';


const routes = [
  { path: 'login', component: LandPageComponent},
  { path: 'login/:action', component: LandPageComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class LandpageRoutingModule {}
