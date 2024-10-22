import { createReducer, on } from '@ngrx/store';
import { VideoState } from '../../utils/interfaces';
import { VideoActions } from './video.actions';

export const initialVideosState: VideoState = {
  videos: [],
  nextPageToken: '',
  prevPageToken: '',
};

export const videosReducer = createReducer(
  initialVideosState,
  on(VideoActions.addVideo, (state, { video }) => {
    return { ...state, videos: [...state.videos, video] };
  }),
  on(VideoActions.updateToken, (state, { purpose, token }) => {
    return purpose === 'next'
      ? { ...state, nextPageToken: token }
      : { ...state, prevPageToken: token };
  }),
  on(VideoActions.clearVideo, (state) => {
    return { ...state, videos: [] };
  }),
  on(VideoActions.updateVideo, (state, { newVideo }) => {
    return { ...state, videos: [...newVideo] };
  }),
  on(VideoActions.success, (state) => {
    return { ...state };
  })
);
