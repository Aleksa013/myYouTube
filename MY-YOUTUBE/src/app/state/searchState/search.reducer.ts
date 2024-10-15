import { createReducer, on } from '@ngrx/store';
import { SearchState } from '../../utils/interfaces';
import { SearchActions } from './search.actions';

export const initialSearchState: SearchState = {
  searchWord: '',
  isNew: false,
  error: '',
};

export const searchReducer = createReducer(
  initialSearchState,
  on(SearchActions.addSearch, (state, { word }) => {
    return { ...state, isNew: true, searchWord: word };
  }),
  on(SearchActions.updateSearch, (state, { isNew }) => {
    return { ...state, isNew };
  }),
  on(SearchActions.errorSearch, (state, { error }) => {
    return { ...state, error };
  })
);
