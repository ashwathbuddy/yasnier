import { NgModule } from '@angular/core';
import { NavigationStart, Router, RouterModule, Routes } from '@angular/router';

import { isLoggedIn } from './core/auth/auth.guard';

import { LoginComponent } from './modules/login/login.component';
import { PrivateComponent } from './modules/private/private.component';
import { PublicComponent } from './modules/public/public.component';

const routes: Routes = [
  { path: 'login-default-redirect', pathMatch: 'full', redirectTo: 'private' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [isLoggedIn()],
    component: PublicComponent,
  },
  {
    path: 'private',
    canActivate: [isLoggedIn()],
    component: PrivateComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  // TODO: remove
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.warn('Routing Event:', event); // Log the event
      }
    });
  }
}
