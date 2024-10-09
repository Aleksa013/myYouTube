import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../utils/interfaces';
import { AuthAction, AuthNameAction } from './auth.actions';

export const initialAuthState: AuthState = {
  isAuth: false,
  userName: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthAction, (state) => {
    return { ...state, isAuth: !state.isAuth };
  }),
  on(AuthNameAction, (state, { userName }) => {
    return { ...state, userName };
  })
);
