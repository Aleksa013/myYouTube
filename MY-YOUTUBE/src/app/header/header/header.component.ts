import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserInfoComponent } from '../user-info/user-info.component';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuth } from '../../state/authState/auth.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthAction, AuthNameAction } from '../../state/authState/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    UserInfoComponent,
    SearchFieldComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public isAuth = false;
  private readonly authStatus: Observable<boolean>;
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {
    this.authStatus = this.store.select(selectAuth);
  }

  ngOnInit() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      const name = localStorage.getItem('token')!.split('/')[0];
      console.log(name);
      this.store.dispatch(AuthNameAction({ userName: name }));
      this.store.dispatch(AuthAction());
    }
    this.authStatus
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status: boolean) => (this.isAuth = status));
  }
}
