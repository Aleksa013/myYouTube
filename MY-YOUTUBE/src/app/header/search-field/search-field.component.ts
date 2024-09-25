import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VideoService } from '../../services/video.service';
import { Store } from '@ngrx/store';
import { VideoActions } from '../../state/videoState/video.actions';
import { SearchResult } from '../../utils/interfaces';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  public search: string;
  private destroyRef = inject(DestroyRef);
  constructor(private store: Store, private searchService: VideoService) {
    this.search = '';
  }

  protected onSubmit() {
    console.log(this.search);
    this.searchService
      .getSearch(this.search)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((answer: SearchResult): void => {
        console.log(answer);
        this.store.dispatch(VideoActions.addVideo({ video: answer.items[0] }));
      });
  }
}
