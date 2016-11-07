import { Component, EventEmitter, Output } from '@angular/core';
import { Credentials } from './credentials';
import { ApiService } from '../../../services';

@Component({
  selector: 'login-form-component',
  styles: [ require('./login.form.component.scss') ],
  template: `
  <div class="form-container">
    <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Email" required
          [(ngModel)]="model.email"
          ngControl="email" name="email">
        <input type="password" class="form-control" placeholder="Password" required
          [(ngModel)]="model.password"
          ngControl="password" name="password">
      </div>
      <button type="submit" class="btn btn-default"
        [disabled]="!loginForm.form.valid">Submit</button>
    </form>
  </div>
  <div class="message">{{message}}</div>
  `,
})
export class LoginFormComponent {
  @Output() onSuccess = new EventEmitter();

  constructor( private apiService: ApiService ) {}

  model = new Credentials();
  submitted = false;
  message = null;
  onSubmit() {
    this.message = null;
    this.submitted = true;
    this.apiService.login(this.model.email, this.model.password).subscribe(
      user => this.onSuccess.emit(true),
      error => {
        this.message = 'Please try again';
      }
    );
  }
}
