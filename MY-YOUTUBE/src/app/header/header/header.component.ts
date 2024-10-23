import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserInfoComponent } from '../user-info/user-info.component';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuth } from '../../state/authState/auth.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AuthAction,
  AuthAvatarAction,
  AuthNameAction,
} from '../../state/authState/auth.actions';
import { SettingsPanelComponent } from '../settingsPanel/settings-panel/settings-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    UserInfoComponent,
    SearchFieldComponent,
    SettingsPanelComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public isAuth = false;
  public isSettingsOpen = false;
  public avatar = 'person';
  @ViewChild('wrapper') public wrapper!: ElementRef;
  @ViewChild('userInfo') public userInfo!: ElementRef;
  private readonly authStatus$: Observable<boolean>;
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store, private router: Router) {
    this.authStatus$ = this.store.select(selectAuth);
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      const name = localStorage.getItem('token')!.split('/')[0];
      this.store.dispatch(AuthNameAction({ userName: name }));
      this.store.dispatch(AuthAction());
    }
    if (localStorage.getItem('ava')) {
      const ava = localStorage.getItem('ava')!;
      this.store.dispatch(AuthAvatarAction({ avatar: ava }));
    }
    this.authStatus$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status: boolean) => (this.isAuth = status));
  }

  public toggleVisibleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
    setTimeout(() => {
      if (this.wrapper.nativeElement.classList.contains('settingsVisible')) {
        this.wrapper.nativeElement.classList.remove('settingsVisible');
      } else {
        this.wrapper.nativeElement.classList.add('settingsVisible');
      }
    }, 500);
  }

  public goToMain() {
    this.router.navigate(['home']);
  }
}
