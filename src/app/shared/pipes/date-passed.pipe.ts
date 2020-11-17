import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePassed'
})
export class DatePassedPipe implements PipeTransform {
  transform(value: string) {
    const date = new Date(value);
    const today = new Date(Date.now());
    const ecart = new Date(today.getTime() - date.getTime());

    if (ecart.getFullYear() - 1970 > 0) {
      return (ecart.getFullYear() - 1970) + 'y';
    } else if (ecart.getMonth() > 1) {
      return ecart.getMonth() + 'm';
    } else if (ecart.getDate() > 1) {
      return (ecart.getDate() - 1) + 'd';
    } else if (ecart.getHours() > 1) {
      return ecart.getHours() + 'h';
    } else if (ecart.getMinutes() > 1) {
      return ecart.getMinutes() + 'm';
    } else if (ecart.getSeconds() > 1) {
      return ecart.getSeconds() + 's';
    }
  }
}
