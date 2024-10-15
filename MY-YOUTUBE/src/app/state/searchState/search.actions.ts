import { createActionGroup, props } from '@ngrx/store';

export const SearchActions = createActionGroup({
  source: 'Search',
  events: {
    'Add search': props<{ word: string }>(),
    'Update search': props<{ isNew: boolean }>(),
    'Error search': props<{ error: string }>(),
  },
});
