import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectNameAuth } from '../../state/authState/auth.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnInit {
  public userName: string | undefined;
  private name: Observable<string | undefined>;
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {
    this.name = this.store.select(selectNameAuth);
  }

  ngOnInit() {
    this.name.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((name) => {
      this.userName = name;
    });
  }
}
