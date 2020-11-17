import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ResearchRoutingModule } from './research-routing.module';

import { ResearchComponent } from './research.component';


@NgModule({
  imports: [SharedModule, ResearchRoutingModule],
  declarations: [ResearchComponent]
})

export class ResearchModule {

}
