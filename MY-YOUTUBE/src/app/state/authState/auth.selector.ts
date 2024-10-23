import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../utils/interfaces';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuth = createSelector(
  selectAuthState,
  (state) => state.isAuth
);

export const selectNameAuth = createSelector(
  selectAuthState,
  (state) => state.userName
);

export const selectAvatarAuth = createSelector(
  selectAuthState,
  (state) => state.avatar
);
