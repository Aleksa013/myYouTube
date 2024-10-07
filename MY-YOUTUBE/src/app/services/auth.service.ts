import { Injectable } from '@angular/core';
import * as myENV from './../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthAction } from '../state/authState/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authURL: string = myENV.environment.apiUrlAuth;

  constructor(private http: HttpClient, private store: Store) {}

  public getAuth() {
    this.http.get(this.authURL, {
      params: { client_id: myENV.key, redirect_uri: 'localhost' },
    });
  }

  public getFalseAuth(login: string, password: string) {
    this.store.dispatch(AuthAction());
    localStorage.setItem('token', `${login}/${password}`);
  }
}
