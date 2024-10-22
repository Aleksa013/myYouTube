import { DestroyRef, inject, Injectable } from '@angular/core';
import { VideoItem } from '../../utils/interfaces';
import { Store } from '@ngrx/store';
import { selectVideos } from '../../state/videoState/video.selectors';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private videos!: VideoItem[];
  private videos$: Observable<VideoItem[]>;
  private destroyRef = inject(DestroyRef);
  constructor(private store: Store) {
    this.videos$ = this.store.select(selectVideos);
    this.videos$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((videoArr: VideoItem[]) => {
        this.videos = [...videoArr];
      });
  }

  public sortVideos(sortingBy: string, parameter: 'Up' | 'Down'): VideoItem[] {
    let sortArr: VideoItem[] = [];
    switch (sortingBy) {
      case 'date':
        sortArr = this.videos.sort(
          (a, b) =>
            new Date(a.snippet.publishedAt).valueOf() -
            new Date(b.snippet.publishedAt).valueOf()
        );
        break;
      case 'likes':
        sortArr = this.videos.sort(
          (a, b) => +a.statistics.likeCount - +b.statistics.likeCount
        );
        break;
      case 'views':
        sortArr = this.videos.sort(
          (a, b) => +a.statistics.viewCount! - +b.statistics.viewCount!
        );
        break;
      default:
        sortArr = [];
    }
    return parameter === 'Up' ? sortArr : sortArr.reverse();
  }
}
