import { Component } from '@angular/core';
import { VideoItem } from '../../utils/interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectVideos } from '../../state/videoState/video.selectors';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  public readonly videosState$: Observable<VideoItem[]>;

  constructor(private store: Store) {
    this.videosState$ = this.store.select(selectVideos);
  }
}
