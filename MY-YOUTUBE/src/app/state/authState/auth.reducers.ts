import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../utils/interfaces';
import { AuthAction, AuthAvatarAction, AuthNameAction } from './auth.actions';

export const initialAuthState: AuthState = {
  isAuth: false,
  userName: undefined,
  avatar: 'person',
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthAction, (state) => {
    return { ...state, isAuth: !state.isAuth };
  }),
  on(AuthNameAction, (state, { userName }) => {
    return { ...state, userName };
  }),
  on(AuthAvatarAction, (state, { avatar }) => {
    return { ...state, avatar };
  })
);
