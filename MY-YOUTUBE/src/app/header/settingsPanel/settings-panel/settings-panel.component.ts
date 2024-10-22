import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SortingService } from '../../../services/soting/sorting.service';
import { Store } from '@ngrx/store';
import { VideoActions } from '../../../state/videoState/video.actions';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [MatIconButton, MatIconModule],
  templateUrl: './settings-panel.component.html',
  styleUrl: './settings-panel.component.scss',
})
export class SettingsPanelComponent {
  constructor(private sort: SortingService, private store: Store) {}

  public getSorting(sortingBy: string, parameter: 'Up' | 'Down') {
    const newArr = this.sort.sortVideos(sortingBy, parameter);
    this.store.dispatch(VideoActions.updateVideo({ newVideo: newArr }));
  }
}
