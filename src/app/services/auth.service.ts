import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IUserRegisterData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth$ = new BehaviorSubject<boolean>(false);
  public activeUser: IUserRegisterData | null | undefined;

  constructor() {
    this.checkIsAuth();
  }

  private checkIsAuth(): void {
    const activeUser = this.users.length
      ? this.users.find((user) => user.isAuth)
      : null;

    this.activeUser = activeUser;
    this.isAuth$.next(!!activeUser);
  }

  public get users(): IUserRegisterData[] {
    return JSON.parse(
      window.localStorage.getItem('users') || '[]'
    ) as IUserRegisterData[];
  }
}
