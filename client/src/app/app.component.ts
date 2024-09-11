import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AccountService } from './shared/services';

export interface AppUser {
  id: number;
  userName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  private accountService = inject(AccountService);
  title = 'client';
  users$: Observable<AppUser[]> | null = null;

  ngOnInit(): void {
    this.accountService.getUserFromStorage();
  }

  getUsers(): void {
    this.users$ = this.http.get<AppUser[]>('https://localhost:5001/api/users');
  }
}
