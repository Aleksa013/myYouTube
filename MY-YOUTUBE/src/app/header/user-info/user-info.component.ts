import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectAvatarAuth,
  selectNameAuth,
} from '../../state/authState/auth.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnInit {
  public userName: string | undefined;
  public readonly avatar$: Signal<string>;
  private name$: Observable<string | undefined>;
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store, private router: Router) {
    this.name$ = this.store.select(selectNameAuth);
    this.avatar$ = this.store.selectSignal(selectAvatarAuth);
  }

  ngOnInit() {
    this.name$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((name) => {
      this.userName = name;
    });
  }

  public goToProfile() {
    this.router.navigate(['profile']);
  }
}
