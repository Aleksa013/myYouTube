import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { videosReducer } from './state/videoState/video.reducer';
import { favoriteVideoReducer } from './state/favoriteVideoState/favoriteVideo.reducer';
import { myVideoReducer } from './state/myVideoState/myVideo.reducer';
import { searchReducer } from './state/searchState/search.reducer';
import { authReducer } from './state/authState/auth.reducers';
import { VideosEffects } from './state/effects/videos.effects';
import { FavoriteVideosEffects } from './state/effects/favoriteVideos.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom([
      BrowserAnimationsModule,
      StoreModule.forRoot(),
      StoreModule.forFeature('favorite', favoriteVideoReducer),
    ]),
    provideStore({
      auth: authReducer,
      video: videosReducer,
      favoriteVideo: favoriteVideoReducer,
      myVideo: myVideoReducer,
      search: searchReducer,
    }),
    provideStoreDevtools(),
    provideEffects([VideosEffects, FavoriteVideosEffects]),
    provideAnimationsAsync(),
  ],
};
