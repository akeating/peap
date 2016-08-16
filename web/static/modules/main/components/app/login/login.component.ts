import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login-component',
  styles: [ require('./login.component.scss') ],
  template: `
    <div class="page-header"></div>
    <login-form-component (onSuccess)="onSuccessFullLogin()"></login-form-component>
  `
})
export class LoginComponent {

  constructor( private route: ActivatedRoute, private router: Router) {}

  onSuccessFullLogin() {
    let returnUrl = this.route.snapshot.params['returnUrl'];
    if (returnUrl) {
      let decodedReturnUrl = decodeURIComponent(returnUrl);
      this.router.navigateByUrl(decodedReturnUrl);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
