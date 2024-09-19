import { createReducer, on } from '@ngrx/store';
import { FavoriteState } from '../../utils/interfaces';
import { FavoriteVideoActions } from './favoriteVideo.actions';

export const initialFavoriteVideoState: FavoriteState = {
  favorite: [],
};

export const favoriteVideoReducer = createReducer(
  initialFavoriteVideoState,
  on(FavoriteVideoActions.addFavoriteVideo, (state, { favoriteItem }) => {
    return { favorite: [...state.favorite, favoriteItem] };
  }),
  on(FavoriteVideoActions.removeFavoriteVideo, (state, { favoriteItemId }) => {
    const filteredArray = state.favorite.filter(
      (video) => video.id.videoId !== favoriteItemId
    );
    return { favorite: [...filteredArray] };
  })
);
