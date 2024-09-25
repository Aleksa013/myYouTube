import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideoState } from '../../utils/interfaces';

export const selectVideoState = createFeatureSelector<VideoState>('video');

export const selectVideos = createSelector(
  selectVideoState,
  (state) => state.videos
);
export const selectNextToken = createSelector(
  selectVideoState,
  (state) => state.nextPageToken
);
export const selectPrevToken = createSelector(
  selectVideoState,
  (state) => state.prevPageToken
);
