import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Place } from '../../core/Api/Model/Place';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})

export class SearchboxComponent {
  resultDropdown = false;
  search_result: Array<Place> = [];
  @Output() new_results = new EventEmitter <Array<Place>>();
  @Output() item_selected = new EventEmitter<number>();
  @Output() userCenter = new EventEmitter<null>();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
      .addSvgIcon(
        'search',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/search.svg'))
      .addSvgIcon(
        'geolocation',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/location.svg'))
      .addSvgIcon(
        'palette',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/palette.svg'))
      .addSvgIcon(
        'full_star',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/full_star.svg'))
      .addSvgIcon(
        'half_star',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/full_star.svg'))
      .addSvgIcon(
        'star',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/star.svg'))
      .addSvgIcon(
        'target',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/target.svg'))
      .addSvgIcon(
        'place',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/black_place.svg'))
      .addSvgIcon(
        'big_assignment',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/big_assignment.svg'))
      .addSvgIcon(
        'bar',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/bar.svg'));
  }

  ToggleResultDropdown() {
    this.resultDropdown = !this.resultDropdown;
    //this.search_result = this.api.getMockPlace();
    this.new_results.emit(this.search_result);
  }

  selectItem(item: number) {
    this.item_selected.emit(item);
  }

  geoCenter() {
    this.userCenter.emit();
  }
}
