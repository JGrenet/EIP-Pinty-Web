import {AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-compat',
  templateUrl: './compat.component.html',
  styleUrls: ['./compat.component.scss']
})

export class CompatComponent implements AfterViewInit {
  @Input() compatScore;
  @ViewChild('circle') circle: ElementRef;

  ngAfterViewInit() {
    switch (true) {
      case this.compatScore >= 0 && this.compatScore <= 5:
        this.circle.nativeElement.style.backgroundColor = '#C0392B';
        break;
      case this.compatScore > 5 && this.compatScore <= 10:
        this.circle.nativeElement.style.backgroundColor = '#BE472A';
        break;
      case this.compatScore > 10 && this.compatScore <= 15:
        this.circle.nativeElement.style.backgroundColor = '#BD5629';
        break;
      case this.compatScore > 15 && this.compatScore <= 20:
        this.circle.nativeElement.style.backgroundColor = '#BC6428';
        break;
      case this.compatScore > 20 && this.compatScore <= 25:
        this.circle.nativeElement.style.backgroundColor = '#BA7327';
        break;
      case this.compatScore > 25 && this.compatScore <= 30:
        this.circle.nativeElement.style.backgroundColor = '#B98126';
        break;
      case this.compatScore > 30 && this.compatScore <= 35:
        this.circle.nativeElement.style.backgroundColor = '#B88F25';
        break;
      case this.compatScore > 35 && this.compatScore <= 40:
        this.circle.nativeElement.style.backgroundColor = '#B79E24';
        break;
      case this.compatScore > 40 && this.compatScore <= 45:
        this.circle.nativeElement.style.backgroundColor = '#B5AC23';
        break;
      case this.compatScore > 45 && this.compatScore <= 50:
        this.circle.nativeElement.style.backgroundColor = '#AEB422';
        break;
      case this.compatScore > 50 && this.compatScore <= 55:
        this.circle.nativeElement.style.backgroundColor = '#9EB321';
        break;
      case this.compatScore > 55 && this.compatScore <= 60:
        this.circle.nativeElement.style.backgroundColor = '#8DB220';
        break;
      case this.compatScore > 60 && this.compatScore <= 65:
        this.circle.nativeElement.style.backgroundColor = '#7DB01F';
        break;
      case this.compatScore > 65 && this.compatScore <= 70:
        this.circle.nativeElement.style.backgroundColor = '#6CAF1F';
        break;
      case this.compatScore > 70 && this.compatScore <= 75:
        this.circle.nativeElement.style.backgroundColor = '#5CAE1E';
        break;
      case this.compatScore > 75 && this.compatScore <= 80:
        this.circle.nativeElement.style.backgroundColor = '#4CAD1D';
        break;
      case this.compatScore > 80 && this.compatScore <= 85:
        this.circle.nativeElement.style.backgroundColor = '#3CAB1C';
        break;
      case this.compatScore > 85 && this.compatScore <= 90:
        this.circle.nativeElement.style.backgroundColor = '#2CAA1B';
        break;
      case this.compatScore > 90 && this.compatScore <= 95:
        this.circle.nativeElement.style.backgroundColor = '#1CA91A';
        break;
      case this.compatScore > 95 && this.compatScore <= 100:
        this.circle.nativeElement.style.backgroundColor = '#1AA826';
        break;
    }
  }
}
