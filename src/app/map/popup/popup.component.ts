import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Place } from '../../core/Api/Model/Place';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {

  @Input() placeData: Place;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
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
        'outlink',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/outlink.svg'))
      .addSvgIcon(
        'bar',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/bar.svg'));

      this.placeData = new Place();
  }
}
