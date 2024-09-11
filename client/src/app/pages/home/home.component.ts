import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AccountService,
  FormValue,
  RegisterForm,
  UserDTO,
  UsersService
} from '@shared';
import { Observable, map } from 'rxjs';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  accountService = inject(AccountService);
  usersService = inject(UsersService);
  registerMode = false;
  users$: Observable<string[]> = this.usersService
    .getUsers()
    .pipe(map((users) => users.map((user) => user.userName)));

  ngOnInit() {}

  toggleRegisterMode(): void {
    this.registerMode = !this.registerMode;
  }

  handleRegister($event: UserDTO): void {
    console.log($event, 'new user')
  }
}
