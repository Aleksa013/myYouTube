import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoItem } from '../../utils/interfaces';
import { Observable } from 'rxjs';
import { selectVideos } from '../../state/videoState/video.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatisticsComponent } from '../../statistics/statistics/statistics.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [StatisticsComponent, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  private videos$: Observable<VideoItem[]>;
  private destroyRef = inject(DestroyRef);
  public currentVideo!: VideoItem;

  constructor(private store: Store) {
    this.videos$ = this.store.select(selectVideos);
  }
  ngOnInit(): void {
    this.videos$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((videos: VideoItem[]) => (this.currentVideo = videos[0]));
  }
}
