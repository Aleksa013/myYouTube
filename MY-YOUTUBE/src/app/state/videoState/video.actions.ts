import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { VideoItem } from '../../utils/interfaces';

export const VideoActions = createActionGroup({
  source: 'Videos',
  events: {
    'Add Video': props<{ video: VideoItem }>(),
    'Update Token': props<{ purpose: 'next' | 'prev'; token: string }>(),
    'Clear Video': emptyProps(),
    'Update Video': props<{ id: string; liked: boolean }>(),
  },
});
