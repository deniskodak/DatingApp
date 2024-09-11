import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBase } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/';

  getUsers(): Observable<UserBase[]> {
    return this.http.get<UserBase[]>(`${this.baseUrl}users`);
  }
}
