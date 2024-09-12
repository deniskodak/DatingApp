import { Routes } from '@angular/router';
import { createAuthorizeGuard } from '@shared';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [createAuthorizeGuard('private')],
    children: [
      {
        path: 'members',
        children: [
          {
            path: '',

            loadComponent: () =>
              import('./pages/members/member-list/member-list.component').then(
                (m) => m.MemberListComponent
              )
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './pages/members/member-detail/member-detail.component'
              ).then((m) => m.MemberDetailComponent)
          }
        ]
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/user-list/user-list.component').then(
            (m) => m.UserListComponent
          )
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./pages/messages/messages.component').then(
            (m) => m.MessagesComponent
          )
      }
    ]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [createAuthorizeGuard('public')]
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      )
  },
  {
    path: 'server-error',
    loadComponent: () =>
      import('./pages/server-error/server-error.component').then(
        (m) => m.ServerErrorComponent
      )
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
