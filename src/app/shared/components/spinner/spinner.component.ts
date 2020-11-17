import { Component, Input } from '@angular/core';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [
    trigger('showSpinner', [
      transition('* => run', [
        query('.block', [
          stagger(375, [
            animate('1.5s cubic-bezier(.77,0,.18,1)', keyframes([
              style({
                transform: 'translateX(80px)',
                offset: 0.25
              }),
              style({
                transform: 'translateX(80px) translateY(80px)',
                offset: 0.50
              }),
              style({
                transform: 'translateY(80px) translateX(0px)',
                offset: 0.75
              }),
              style({
                transform: 'translateY(0px) translateX(0px)',
                offset: 1
              })
            ]))
          ])
        ])
      ]),
      transition('run => state1', [

      ])
    ])
  ]
})

export class SpinnerComponent {
  @Input() state = 'stop';
  canRun: boolean;

  /*public toggleState() {
    if (this.state === 'stop') {
      this.state = 'run';
      this.canRun = true;
    } else {
      this.state = 'stop';
      this.canRun = false;
    }
  }*/

  onAnimationDone(event: AnimationEvent) {
    if (event['fromState'] !== 'void' && this.canRun) {
      setTimeout(() => {
        this.state === 'state1' ? this.state = 'run' : this.state = 'state1';
      }, 0);
    }
  }
}
