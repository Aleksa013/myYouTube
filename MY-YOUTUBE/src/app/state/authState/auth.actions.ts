import { createAction, props } from '@ngrx/store';

export const AuthAction = createAction('[isAuth] change');
export const AuthNameAction = createAction(
  '[isAuth] name change',
  props<{ userName: string }>()
);
export const AuthAvatarAction = createAction(
  '[isAuth] avatar change',
  props<{ avatar: string }>()
);
