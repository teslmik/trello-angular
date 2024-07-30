import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { IUserRegisterData } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isAuth$: Observable<boolean>;

  constructor(private router: Router, public authService: AuthService) {}

  public logout() {
    const users: IUserRegisterData[] = this.authService.users;
    users.map((user) => {
      if (user.name === this.authService.activeUser?.name) {
        user.isAuth = false;
      }
    });

    window.localStorage.setItem('users', JSON.stringify(users));

    this.router.navigateByUrl('auth/login');
    this.authService.activeUser = null;
    this.authService.isAuth$.next(false);
  }
}
