import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login/login.component.ts';
import { DashboardComponent } from './dashboard/dashboard.component.ts';
import { TokenGuard, AuthGuard } from '../../support/guards';

export const routes: RouterConfig = [
  { path: 'login', component: LoginComponent, canActivate: [TokenGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes, { enableTracing: false })
];
