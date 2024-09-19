import { createActionGroup, props } from '@ngrx/store';
import { VideoItem } from '../../utils/interfaces';

export const FavoriteVideoActions = createActionGroup({
  source: 'Favorite',
  events: {
    'Add Favorite Video': props<{ favoriteItem: VideoItem }>(),
    'Remove Favorite Video': props<{ favoriteItemId: string }>(),
  },
});
