import { createReducer, on } from '@ngrx/store';
import { FavoriteState } from '../../utils/interfaces';
import { FavoriteVideoActions } from './favoriteVideo.actions';

export const initialFavoriteVideoState: FavoriteState = {
  favorite: [],
  lastAdded: '',
  lastRemoved: '',
};

export const favoriteVideoReducer = createReducer(
  initialFavoriteVideoState,
  on(FavoriteVideoActions.addFavoriteVideo, (state, { favoriteItem }) => {
    return { ...state, favorite: [...state.favorite, favoriteItem] };
  }),
  on(FavoriteVideoActions.removeFavoriteVideo, (state, { favoriteItemId }) => {
    const filteredArray = state.favorite.filter(
      (video) => video.id.videoId !== favoriteItemId
    );
    return { ...state, favorite: [...filteredArray] };
  }),
  on(FavoriteVideoActions.getLastAddedFavoriteVideo, (state, { id }) => {
    return { ...state, lastAdded: id };
  }),
  on(FavoriteVideoActions.getLastRemovedFavoriteVideo, (state, { id }) => {
    return { ...state, lastRemoved: id };
  })
);
