import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoItem } from '../../utils/interfaces';
import { StatisticsComponent } from './statistics/statistics.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LenghtLessPipe } from '../../pipes/lenght-less.pipe';
import { Router } from '@angular/router';
import { ColorsDateService } from '../../services/colorsDate/colors-date.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, StatisticsComponent, MatButtonModule, LenghtLessPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() public currentVideo!: VideoItem;
  public colorBottom = '';
  private colorService = inject(ColorsDateService);

  constructor(private store: Store, private router: Router) {}
  ngOnInit(): void {
    console.log(this.currentVideo);
    this.colorBottom = this.colorService.getColorByDate(
      new Date(this.currentVideo!.snippet.publishedAt)
    );
  }

  public getCard() {
    this.router.navigate(['video', this.currentVideo.id]);
  }
}
