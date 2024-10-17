import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from '../../utils/interfaces';

export const selectFavoriteVideoState =
  createFeatureSelector<FavoriteState>('favorite');

export const selectFavoriteVideos = createSelector(
  selectFavoriteVideoState,
  (state) => state.favorite
);
export const selectLastAddedFavoriteVideos = createSelector(
  selectFavoriteVideoState,
  (state) => state.lastAdded
);
export const selectLastRemovedFavoriteVideos = createSelector(
  selectFavoriteVideoState,
  (state) => state.lastRemoved
);
