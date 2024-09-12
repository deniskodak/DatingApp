import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            const validationErrors = error.error?.errors;
            // validation errors
            if (validationErrors) {
              const modalStateErrors = [];
              for (const key in validationErrors) {
                modalStateErrors.push(validationErrors[key]);
              }
              throw modalStateErrors.flat();
            }
            // other error
            else {
              toastr.error(error.error, error.status);
            }
            break;
          case 401:
            toastr.error('Unauthorised', error.status);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: error.error }
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Unexpected error');
            break;
        }
      }
      return throwError(() => error);
    })
  );
}
