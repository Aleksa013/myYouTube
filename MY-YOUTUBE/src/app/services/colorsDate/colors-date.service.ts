import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorsDateService {
  private now: Date;
  protected color: string;
  constructor() {
    this.now = new Date();
    this.color = '--yellow';
  }

  public getColorByDate(date: Date) {
    const time: number =
      (this.now.valueOf() - date.valueOf()) / (1000 * 60 * 60 * 24);
    if (time < 7) {
      this.color = '--primary-blue';
    }
    if (7 <= time && time < 30) {
      this.color = '--green';
    }
    if (30 <= time && time < 180) {
      this.color = '--yellow';
    }
    if (180 <= time) {
      this.color = '--red';
    }
    return this.color;
  }
}
