import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SearchActions } from '../searchState/search.actions';
import { VideoActions } from '../videoState/video.actions';
import { catchError, exhaustMap, Observable, of, switchMap, take } from 'rxjs';
import { VideoItem } from '../../utils/interfaces';
import { VideoService } from '../../services/video/video.service';
import { selectWord } from '../searchState/search.selector';

@Injectable()
export class VideosEffects {
  private searchWord$: Observable<string>;
  private actions$ = inject(Actions);
  constructor(private store: Store, private search: VideoService) {
    this.searchWord$ = this.store.select(selectWord);
  }

  public searchByWordView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.addSearch),
      exhaustMap(({ word }) =>
        this.search.getSearchToOrderView(word).pipe(
          take(1),
          switchMap(({ items }) => {
            const stringID = this.getIDArray(items);
            return this.getSearchById(stringID);
          }),
          catchError((err) =>
            of(SearchActions.errorSearch({ error: err.message }))
          )
        )
      )
    )
  );

  private getIDArray(videos: VideoItem[]): string {
    return videos
      .map((video) => {
        return video.id.videoId;
      })
      .join(',');
  }

  private getSearchById = (id: string) =>
    this.search.getVideoByID(id).pipe(
      take(1),
      switchMap(({ items }) => {
        return of(
          ...items.map((video: VideoItem) => VideoActions.addVideo({ video }))
        );
      }),
      catchError((err) => of(SearchActions.errorSearch({ error: err.message })))
    );
}
