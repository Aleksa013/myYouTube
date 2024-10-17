import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FavoriteVideoActions } from '../favoriteVideoState/favoriteVideo.actions';
import { catchError, exhaustMap, Observable, of, switchMap, take } from 'rxjs';
import { VideoItem } from '../../utils/interfaces';
import { selectVideos } from '../videoState/video.selectors';
import {
  selectLastAddedFavoriteVideos,
  selectLastRemovedFavoriteVideos,
} from '../favoriteVideoState/favoriteVideo.selector';
import { SearchActions } from '../searchState/search.actions';

@Injectable()
export class FavoriteVideosEffects {
  private allVideos$: Observable<VideoItem[]>;
  private lastAddedId$: Observable<string>;
  private lastRemovedId$: Observable<string>;
  private actions$ = inject(Actions);
  constructor(private store: Store) {
    this.allVideos$ = this.store.select(selectVideos);
    this.lastAddedId$ = this.store.select(selectLastAddedFavoriteVideos);
    this.lastRemovedId$ = this.store.select(selectLastRemovedFavoriteVideos);
  }

  public incrementCountLikes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteVideoActions.getLastAddedFavoriteVideo),
      exhaustMap(({ id }) => {
        return this.allVideos$.pipe(
          take(1),
          switchMap((videos: VideoItem[]) => {
            const addedVideo = videos.filter((video: VideoItem) => {
              return video.id.videoId === id;
            })[0];
            return of(
              FavoriteVideoActions.addFavoriteVideo({
                favoriteItem: addedVideo,
              })
            );
          }),
          catchError((error) =>
            of(SearchActions.errorSearch({ error: error.message }))
          )
        );
      })
    );
  });

  public decrementCountLikes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteVideoActions.getLastRemovedFavoriteVideo),
      switchMap(({ id }) =>
        of(FavoriteVideoActions.removeFavoriteVideo({ favoriteItemId: id }))
      ),
      catchError((error) =>
        of(SearchActions.errorSearch({ error: error.message }))
      )
    );
  });
}
