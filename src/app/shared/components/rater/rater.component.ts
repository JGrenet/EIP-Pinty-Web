import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-rater',
  templateUrl: './rater.component.html',
  styleUrls: ['./rater.component.scss']
})
export class RaterComponent implements OnInit {
  @Input() rate: number;
  @Input() color: string;
  @Input() width: number;
  @Input() height: number;
  @Input() editable = false;
  @Output() onNoteChange = new EventEmitter<number>();
  rateArray = [];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
      .addSvgIcon(
        'full_star',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/full_star.svg'))
      .addSvgIcon(
        'star',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/star.svg'))
      .addSvgIcon(
        'half_star',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/half_star.svg'));
  }

  ngOnInit() {
    this.generateRateArray();
  }

  generateRateArray() {
    for (let i = 0; i < 5; i++) {
      this.rate -= 1;
      if (this.rate >= 0) {
        this.rateArray.push(1);
      } else if (this.rate > -1 && this.rate < 0) {
        this.rateArray.push(0.5);
      } else if (this.rate <= -1) {
        this.rateArray.push(0);
      }
    }
  }

  changeRate(note: number) {
    if (this.editable) {
      this.rate = note;
      this.rateArray = [];
      this.generateRateArray();
      this.onNoteChange.emit(note);
    }
  }
}
