import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { VideoItem } from '../../utils/interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectVideos } from '../../state/videoState/video.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { StatisticsComponent } from '../card/statistics/statistics.component';

@Component({
  selector: 'app-one-card',
  standalone: true,
  imports: [CommonModule, StatisticsComponent],
  templateUrl: './one-card.component.html',
  styleUrl: './one-card.component.scss',
})
export class OneCardComponent implements OnInit {
  public video: VideoItem | undefined;
  private videos$: Observable<VideoItem[]>;
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  constructor(private store: Store, private location: Location) {
    this.videos$ = this.store.select(selectVideos);
  }

  ngOnInit() {
    this.videos$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((videos: VideoItem[]) => {
        const id = this.route.snapshot.params['id'];
        console.log('id', id);
        this.video = videos.filter((video) => video.id === id)[0];
      });
  }

  public goBack() {
    console.log(this.video);
    this.location.back();
  }
}
