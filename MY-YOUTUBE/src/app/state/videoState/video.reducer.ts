import { createReducer, on } from '@ngrx/store';
import { VideoItem, VideoState } from '../../utils/interfaces';
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
  on(VideoActions.updateVideo, (state, { id, liked }) => {
    [...state.videos].forEach((video: VideoItem) => {
      if (video.id.videoId === id && video.statistics!.favoriteCount) {
        const count = Number(video.statistics.favoriteCount);
        if (liked) {
          video.statistics.favoriteCount = count + 1 + '';
        } else {
          video.statistics.favoriteCount = count - 1 + '';
        }
      }
    });
    return { ...state, videos: [...state.videos] };
  })
);
