import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoItem } from '../../utils/interfaces';
import { StatisticsComponent } from './statistics/statistics.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LenghtLess50Pipe } from '../../pipes/lenght-less50.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    StatisticsComponent,
    MatButtonModule,
    LenghtLess50Pipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() public currentVideo!: VideoItem;

  constructor(private store: Store) {}
  ngOnInit(): void {
    console.log(this.currentVideo);
  }
}
