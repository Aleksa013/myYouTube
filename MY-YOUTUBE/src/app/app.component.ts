import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer/footer.component';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VideoItem } from './utils/interfaces';
import { selectVideos } from './state/videoState/video.selectors';
import { CardComponent } from './pages/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    StoreModule,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected videos$: Observable<VideoItem[]>;
  constructor(private store: Store) {
    this.videos$ = this.store.select(selectVideos);
  }
}
