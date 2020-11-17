import {Component, OnInit, ComponentFactoryResolver, Injector, ViewContainerRef, NgModuleRef, DoCheck} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { Place } from '../core/Api/Model/Place';
import { PopupComponent } from './popup/popup.component';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

// TODO Ancre de la popup
// TODO Couleur des svgIcon de la popup
// TODO "See More" de la popup:hover
// TODO Design du pin de geoloc
// TODO Accurency de la geoloc
// TODO Bouton de la page lieu dans la searchbox
// TODO Carroussel d'image dans la popup
// TODO Data de la popup

// export class MapComponent implements OnInit, DoCheck

export class MapComponent implements OnInit {

    map: mapboxgl.Map;
    search_result: Array<Place> = [];
    markerArray: Array<any> = [];
    popupArray: Array<any> = [];
    factory: any;
    userLocation: any;

    constructor(public resolver: ComponentFactoryResolver, public injector: Injector) {
      mapboxgl.accessToken = environment.mapbox.accessToken;
      this.factory = this.resolver.resolveComponentFactory(PopupComponent);
    }

    ngOnInit() {

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        zoom: 14,
        center: ['50.6008333333', '26.2111111111']
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.userLocation = position.coords;

          const el = document.createElement('div');
          el.style.backgroundImage = 'url(\'/assets/icon/geolomarker1.png\')';
          el.style.width = '40px';
          el.style.height = '40px';

          new mapboxgl.Marker(el).setLngLat([this.userLocation.longitude, this.userLocation.latitude]).addTo(this.map);
          this.map.flyTo({center: [this.userLocation.longitude, this.userLocation.latitude]});

          console.log(position.coords);
        });
      }
    }

    // TODO Voir si on garde ou pas dans l'avenir. Je pense que non vu que la popup ne change pas dans le temps.

   /* ngDoCheck() {
      for (let i = 0; i < this.popupArray.length; i++) {
        this.popupArray[i].changeDetectorRef.detectChanges();
      }
    }*/

    private refreshMarker() {
      for (let i = this.markerArray.length - 1; this.markerArray.length > 0; i--) {
        this.markerArray[i].remove();
        this.markerArray.pop();
        this.popupArray[i].destroy();
        this.popupArray[i].pop();
      }

      for (let i = 0; i < this.search_result.length; i++) {
        const popupContent = this.factory.create(this.injector);
        popupContent.instance.placeData = this.search_result[i];
        popupContent.changeDetectorRef.detectChanges();

        const newMarker = new mapboxgl.Marker().setLngLat([this.search_result[i].lng, this.search_result[i].lat]).addTo(this.map);
        const newPopup = new mapboxgl.Popup().setDOMContent(popupContent.location.nativeElement);
        newMarker.setPopup(newPopup);
        this.markerArray.push(newMarker);
        this.popupArray.push(popupContent);
      }
      if (this.markerArray.length > 0) {
        this.map.flyTo({center: [this.search_result[0].lng, this.search_result[0].lat]});
      }
    }

    getSearchResults(searchResults: Array<Place>) {
      this.search_result = searchResults;
      this.refreshMarker();
    }

    selectedItem(item: number) {
      this.map.flyTo({center: [this.search_result[item].lng, this.search_result[item].lat]});
      if (!this.markerArray[item].getPopup().isOpen()) {
        this.markerArray[item].togglePopup();
      }
    }

    geoCenter() {
      this.map.flyTo({center: [this.userLocation.longitude, this.userLocation.latitude]});
    }
}
