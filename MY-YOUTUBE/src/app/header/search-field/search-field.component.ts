import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { SearchActions } from '../../state/searchState/search.actions';

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
  constructor(private store: Store) {
    this.search = '';
  }

  protected onSubmit() {
    this.store.dispatch(SearchActions.addSearch({ word: this.search }));
  }
}
