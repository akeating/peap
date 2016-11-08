import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component.ts';
import { DashboardComponent } from './dashboard/dashboard.component.ts';
import { TokenGuard, AuthGuard } from '../../guards';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [TokenGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
