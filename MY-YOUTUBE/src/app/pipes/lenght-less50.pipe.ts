import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lenghtLess50',
  standalone: true,
})
export class LenghtLess50Pipe implements PipeTransform {
  transform(value: string): unknown {
    return value.length > 50 ? value.slice(0, 50) + ' ...' : value;
  }
}
