import { NgModule } from '@angular/core';

/* Shared Module */
import { SharedModule } from '../shared/shared.module';

import { AroundMeRoutingModule } from './aroundMe-routing.module';
import {AroundMeComponent} from './aroundMe.component';

@NgModule({
  imports: [SharedModule, AroundMeRoutingModule],
  declarations: [AroundMeComponent],
  entryComponents: []
})

export class AroundMeModule {}
