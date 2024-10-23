import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectAvatarAuth,
  selectNameAuth,
} from '../../state/authState/auth.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {
  AuthAvatarAction,
  AuthNameAction,
} from '../../state/authState/auth.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public userName!: string;
  public avatar!: string;
  public editMode: WritableSignal<boolean> = signal(false);
  public newName = '';
  public newAva = '';
  private user$: Observable<string | undefined>;
  private avatar$: Observable<string>;
  private destroyRef = inject(DestroyRef);
  constructor(private store: Store) {
    this.avatar$ = this.store.select(selectAvatarAuth);
    this.user$ = this.store.select(selectNameAuth);
  }

  ngOnInit(): void {
    this.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((name: string | undefined) => {
        if (name) this.userName = name;
      });

    this.avatar$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((avatar: string) => {
        this.avatar = avatar;
        this.newAva = avatar;
      });
  }

  public changeEditMode() {
    this.editMode.set(!this.editMode());
  }

  public saveNewName() {
    if (this.newName.length) {
      this.store.dispatch(AuthNameAction({ userName: this.newName }));
      const password: string | undefined = localStorage
        .getItem('token')
        ?.split('/')[1];
      const newToken: string = this.newName + '/' + password!;
      localStorage.setItem('token', newToken);
    }

    this.changeEditMode();
  }

  public saveNewAvatar() {
    this.store.dispatch(AuthAvatarAction({ avatar: this.newAva }));
    localStorage.setItem('ava', this.newAva);
  }
}
