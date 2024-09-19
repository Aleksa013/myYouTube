import { createReducer, on } from '@ngrx/store';
import { MyVideosState } from '../../utils/interfaces';
import { MyVideoActions } from './myVideo.actions';

export const initialMyVideoState: MyVideosState = {
  myVideo: [],
};

export const myVideoReducer = createReducer(
  initialMyVideoState,
  on(MyVideoActions.addMyVideo, (state, { video }) => {
    return { myVideo: [...state.myVideo, video] };
  }),
  on(MyVideoActions.removeMyVideo, (state, { videoId }) => {
    const filteredArray = state.myVideo.filter(
      (video) => video.id.videoId !== videoId
    );
    return { myVideo: [...filteredArray] };
  })
);
