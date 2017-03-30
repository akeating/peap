import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenGuard, AuthGuard } from '../../guards';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [TokenGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
