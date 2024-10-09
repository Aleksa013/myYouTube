import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuth } from '../state/authState/auth.selector';

export const loginGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  let canActivate = false;
  store.select(selectAuth).subscribe((isAuth: boolean) => {
    canActivate = isAuth;
  });

  if (canActivate) {
    router.navigate(['/home']);
  }
  return canActivate;
};
