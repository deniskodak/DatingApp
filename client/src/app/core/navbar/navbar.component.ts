import { AsyncPipe, TitleCasePipe } from '@angular/common';
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
import { Router, RouterModule } from '@angular/router';
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
    BsDropdownModule,
    TitleCasePipe
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private accountService = inject(AccountService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
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
      .subscribe({
        next: () => {
          this.loginForm.reset();
          this.router.navigateByUrl('/members');
        }
      });
  }

  handleLogout(): void {
    this.accountService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigateByUrl('/')
      });
  }
}
