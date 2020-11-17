import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MapRoutingModule } from './map-routing.module';

import { MapComponent } from './map.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  imports: [SharedModule, MapRoutingModule],
  declarations: [MapComponent, SearchboxComponent, PopupComponent],
  entryComponents: [PopupComponent]
})

export class MapModule {

}
