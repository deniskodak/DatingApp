import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserBase } from '../../interfaces';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private baseUrl = 'https://localhost:5001/api/';

  getUsers(): Observable<UserBase[]> {
    return this.http.get<UserBase[]>(`${this.baseUrl}users`).pipe(
      catchError((error) => {
        this.toastr.error(error.error, 'Login error!');
        return throwError(() => error);
      })
    );
  }
}
