import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { VideoItem } from './../../../utils/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FavoriteVideoActions } from '../../../state/favoriteVideoState/favoriteVideo.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectFavoriteVideos } from '../../../state/favoriteVideoState/favoriteVideo.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  @Input() public video!: VideoItem;
  @ViewChild('like') private like: ElementRef | undefined;
  public likeCount = signal<number>(0);
  private favoriteVideos: Observable<VideoItem[]>;
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {
    this.favoriteVideos = this.store.select(selectFavoriteVideos);
  }

  ngOnInit() {
    this.favoriteVideos
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((favorite: VideoItem[]) => {
        if (
          favorite.some(
            (video: VideoItem) => video.id.videoId === this.video.id.videoId
          )
        ) {
          this.likeCount.set(+this.video.statistics.likeCount + 1);
        } else {
          this.likeCount.set(+this.video.statistics.likeCount);
        }
      });
  }

  public liked() {
    if (this.video.statistics?.favoriteCount) {
      if (this.like?.nativeElement.classList.contains('liked')) {
        this.store.dispatch(
          FavoriteVideoActions.getLastRemovedFavoriteVideo({
            id: this.video.id.videoId,
          })
        );
      } else {
        this.store.dispatch(
          FavoriteVideoActions.getLastAddedFavoriteVideo({
            id: this.video.id.videoId,
          })
        );
      }
      this.like!.nativeElement.classList.toggle('liked');
    }
  }
}
