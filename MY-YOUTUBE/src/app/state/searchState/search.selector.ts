import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../../utils/interfaces';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectIsNew = createSelector(
  selectSearchState,
  (state) => state.isNew
);

export const selectWord = createSelector(
  selectSearchState,
  (state) => state.searchWord
);
