import { createActionGroup, props } from '@ngrx/store';
import { VideoItem } from '../../utils/interfaces';

export const MyVideoActions = createActionGroup({
  source: 'MyVideos',
  events: {
    'Add My Video': props<{ video: VideoItem }>(),
    'Remove My Video': props<{ videoId: string }>(),
  },
});
