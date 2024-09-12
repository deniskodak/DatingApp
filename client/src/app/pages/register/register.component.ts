import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService, RegisterForm, UsersService } from '@shared';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private usersService = inject(UsersService);
  private router = inject(Router);

  registerForm = new FormGroup<RegisterForm>({
    username: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)],
      asyncValidators: [this.nameAsyncValidator.bind(this)],
      updateOn: 'blur',
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  get userNameControl(): FormControl<string> {
    return this.registerForm.controls.username;
  }

  private nameAsyncValidator(
    control: AbstractControl<string>
  ): Observable<ValidationErrors | null> {
    const name = control.value;

    return this.usersService.getUsers().pipe(
      map((users) => {
        const existedUser = users.find(
          ({ userName }) => userName.toLowerCase() === name.toLowerCase()
        );
        return existedUser ? { existedName: true } : null;
      })
    );
  }

  handleRegister(): void {
    if (this.registerForm.invalid) return this.registerForm.markAllAsTouched();

    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/members')
    });
  }
}
