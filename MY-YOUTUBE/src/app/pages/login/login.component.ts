import { Component, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthNameAction } from '../../state/authState/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public authForm: FormGroup = new FormGroup({});
  public hide = signal(true);

  constructor(
    private FB: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authForm = this.FB.group({
      login: this.FB.control<string | null>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: this.FB.control<string | null>('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  public get login(): AbstractControl<string> | null {
    return this.authForm.get('login');
  }

  public get password(): AbstractControl<string> | null {
    return this.authForm.get('password');
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public onSubmit() {
    if (this.authForm.valid) {
      this.authService.getFalseAuth(this.login!.value, this.password!.value);
      this.store.dispatch(AuthNameAction({ userName: this.login!.value }));
    }
    this.router.navigate(['/home']);

    console.log(this.authForm.value);
  }
}
