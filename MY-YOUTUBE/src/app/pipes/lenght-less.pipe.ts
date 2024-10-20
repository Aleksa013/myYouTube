import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lenghtLess',
  standalone: true,
})
export class LenghtLessPipe implements PipeTransform {
  transform(value: string, lengthLess: number): unknown {
    return value.length > lengthLess
      ? value.slice(0, lengthLess) + ' ...'
      : value;
  }
}
