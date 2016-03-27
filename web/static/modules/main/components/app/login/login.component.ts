import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { LoginFormComponent } from './login.form.component';
import { ApiService, DataService, LocalStorage } from '../../../support/services';

@Component({
  selector: 'login-component',
  styles: [ require('./login.component.scss') ],
  providers: [],
  directives: [ LoginFormComponent ],
  pipes: [],
  template: `
    <div class="page-header"></div>
    <login-form-component [ngClass]="{ hidden: hideLoginForm }"
      (onSuccess)="onSuccessFullLogin()"></login-form-component>
  `
})
export class LoginComponent {

  private hideLoginForm: boolean = true;

  constructor( private router: Router, private localStorageService: LocalStorage,
    private apiService: ApiService, private dataService: DataService) {
  }

  ngOnInit() {
    let token = this.localStorageService.get('token');
    if (token) {
      this.apiService.loginWithToken(token).subscribe(
        user => this.onSuccessFullLogin(),
        err => {
          console.log(err);
          this.hideLoginForm = false;
        }
      );
    } else {
      this.hideLoginForm = false;
    }
  }

  onSuccessFullLogin() {

    // TODO: There's gotta be an idiomatic way to get this
    let returnUrl = this.router.root.currentInstruction.component.params['returnUrl'];
    if (returnUrl) {
      let decodedReturnUrl = decodeURIComponent(returnUrl);
      this.router.navigateByUrl(decodedReturnUrl);
    } else {
      this.router.navigate(['Dashboard']);
    }
  }
}
