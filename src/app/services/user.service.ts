import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface ApplicationUser {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$: Observable<ApplicationUser> | null;

  private userSubject = new BehaviorSubject<ApplicationUser | null>(null);

  constructor() {
    this.user$ = this.userSubject.asObservable();
  }

  public get user(): ApplicationUser | null {
    return this.userSubject.value;
  }

  public login(username: string, password: string): Observable<boolean> {
    if (username.toLowerCase() === 'admin' && password === 'pass123') {
      this.userSubject.next({ username });
      return of(true);
    }

    return of(false);
  }

  public logout(): void {
    this.userSubject.next(null);
  }
}
