import { inject } from '@angular/core';
import { AccountService } from '../../services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const createAuthorizeGuard = (scope: 'public' | 'private') => () => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (scope === 'public') {
    if (accountService.currentUser$$())
      toastr.error('Please logout to see the page!');
    return !accountService.currentUser$$() || router.createUrlTree(['/']);
  }

  if (!accountService.currentUser$$())
    toastr.error('Please login to see the page!');
  return accountService.currentUser$$() || router.createUrlTree(['/register']);
};
