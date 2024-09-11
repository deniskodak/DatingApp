import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormValue, LoginForm, RegisterForm, UserDTO } from '@shared';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/';
  private _currentUser$$ = signal<UserDTO | null>(null);
  private storageKey = 'datingAppUser';

  get currentUser$$(): Signal<UserDTO | null> {
    return this._currentUser$$.asReadonly();
  }

  login(formValue: FormValue<FormGroup<LoginForm>>): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(`${this.baseUrl}account/login`, formValue)
      .pipe(tap(this.persistUser));
  }

  register(formValue: FormValue<FormGroup<RegisterForm>>): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(`${this.baseUrl}account/register`, formValue)
      .pipe(tap(this.persistUser));
  }

  logout(): Observable<any> {
    return of(true).pipe(tap(this.removeUser));
  }

  getUserFromStorage(): void {
    const userString = localStorage.getItem(this.storageKey);
    if (userString) this.persistUser(JSON.parse(userString));
  }

  private persistUser = (user: UserDTO): void => {
    if (!user) return;
    this._currentUser$$.set(user);
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  };

  private removeUser = (): void => {
    this._currentUser$$.set(null);
    localStorage.removeItem(this.storageKey);
  };
}
