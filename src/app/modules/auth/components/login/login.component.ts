import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.initForm();
  }

  public submit(): void {
    const users = this.authService.users;
    const user = users.find((userData) => userData.email === this.form.value.email);

    if (!user) {
      this._snackBar.open('User not found!');
      return;
    }

    if (this.form.value.password !== user?.password) {
      this._snackBar.open('Login or password is not correct!');
      return;
    }

    users.map((userRegisterData) => {
      if (userRegisterData.name === user.name) {
        userRegisterData.isAuth = true;
      }
    })
    window.localStorage.setItem('users', JSON.stringify(users));

    this._snackBar.open('Login Success', '', {duration: 3000});
    this.authService.isAuth$.next(true);
    this.authService.activeUser = user;
    this.router.navigateByUrl('trello');
  }

  public getErrorMessage(fieldName: 'email' | 'password'): string {
    const field = this.form.controls[fieldName].errors;
    const isRequired = field?.['required'];

    return isRequired
      ? 'Field is required'
      : `${fieldName === 'email' ? 'Email' : 'Password'} is not valid`;
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
}
