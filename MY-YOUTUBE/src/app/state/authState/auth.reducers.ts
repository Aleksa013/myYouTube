import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../utils/interfaces';
import { AuthAction } from './auth.actions';

export const initialAuthState: AuthState = {
  isAuth: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthAction, (state) => {
    return { ...state, isAuth: !state.isAuth };
  })
);
