import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Role, UserProfileStatus, checkRoles } from './auth.types';

export function isLoggedIn(): CanActivateFn {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const user = await inject(AuthService).authenticatedUser();

    return Boolean(user) || redirectTo('/login', router, route, state);
  };
}

export function hasStatus(status: UserProfileStatus): CanActivateFn {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const user = await inject(AuthService).authenticatedUser();
    if (!user) {
      return redirectTo('/login', router, route, state);
    }
    return Boolean(user.status == status) || redirectTo('/profile', router, route, state);
  };
}

export function hasRole(allowedRoles: Role[]): CanActivateFn {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const user = await inject(AuthService).authenticatedUser();

    return Boolean(user && checkRoles(user, allowedRoles)) || redirectTo('/login', router, route, state);
  };
}

// TODO: https://medium.com/ngconf/functional-route-guards-in-angular-8829f0e4ca5c

// auxiliar function
function redirectTo(url: string, router: Router, _route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const redirectURL = state.url === url ? '' : `redirectUrl=${state.url}`;
  return router.parseUrl(`login?${redirectURL}`);
}
