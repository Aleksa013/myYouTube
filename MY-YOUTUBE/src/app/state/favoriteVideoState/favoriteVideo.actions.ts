import { createActionGroup, props } from '@ngrx/store';
import { VideoItem } from '../../utils/interfaces';

export const FavoriteVideoActions = createActionGroup({
  source: 'favorite',
  events: {
    'Add Favorite Video': props<{ favoriteItem: VideoItem }>(),
    'Remove Favorite Video': props<{ favoriteItemId: string }>(),
    'Get last added Favorite Video': props<{ id: string }>(),
    'Get last removed Favorite Video': props<{ id: string }>(),
  },
});
