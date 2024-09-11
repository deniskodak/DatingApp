import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountService, LetDirective, LoginForm } from '@shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AsyncPipe,
    LetDirective,
    BsDropdownModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  accountService = inject(AccountService);
  destroyRef = inject(DestroyRef);
  user$$ = this.accountService.currentUser$$;

  loginForm = new FormGroup<LoginForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  handleLogin(): void {
    if (this.loginForm.invalid) return;
    this.accountService
      .login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.loginForm.reset();
        console.log(res);
      });
  }

  handleLogout(): void {
    this.accountService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
