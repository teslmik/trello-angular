import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IUserRegisterData } from '../../../../interfaces';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  public form: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.initForm();
  }

  public submit(): void {
    const name = this.form.value.name;
    const userData: IUserRegisterData = {
      email: this.form.value.email,
      name,
      password: this.form.value.password,
      isAuth: true,
    };

    const users = this.authService.users;
    users.push(userData);

    window.localStorage.setItem('users', JSON.stringify(users));

    this._snackBar.open('Registration success', '', {duration: 3000});
    this.authService.isAuth$.next(true);
    this.authService.activeUser = userData;
    this.router.navigateByUrl('trello');
  }

  public getErrorMessage(fieldName: 'email' | 'password' | 'name'): string {
    const field = this.form.controls[fieldName].errors;
    const isRequired = field?.['required'];

    return isRequired
      ? 'Field is required'
      : `${fieldName === 'email' ? 'Email' : 'Password'} is not valid`;
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
}
