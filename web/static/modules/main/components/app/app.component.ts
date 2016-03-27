import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component.ts';
import { DashboardComponent } from './dashboard/dashboard.component.ts';
import { RouteConfig, Router, RouterOutlet } from '@angular/router-deprecated';
import { DataService } from '../../support/services';

@Component({
  selector: 'app-component',
  styles: [ require('./app.component.scss') ],
  providers: [],
  directives: [RouterOutlet],
  pipes: [],
  template: `
    <router-outlet></router-outlet>
  `
})
@RouteConfig([{
  path: '/login',
  name: 'Login',
  component: LoginComponent,
  useAsDefault: true
}, {
  path: '/dashboard',
  name: 'Dashboard',
  component: DashboardComponent
}, {
  path: '/**', redirectTo: ['Login']
}])
export class AppComponent {

  constructor(private dataService: DataService, private router: Router) {
  }

}
