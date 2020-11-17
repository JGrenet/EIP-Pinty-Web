import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HeaderService {
  private sectionTab = new BehaviorSubject<string>('');

  public setSectionTab(value: string) {
    this.sectionTab.next(value);
  }

  public getSectionTab(): BehaviorSubject<string> {
    return this.sectionTab;
  }
}
