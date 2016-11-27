import { Component, EventEmitter, Output } from '@angular/core';
import { Credentials } from './credentials';
import { ApiService } from '../../../services';

@Component({
  selector: 'login-form-component',
  styles: [ require('./login.form.component.scss') ],
  template: require('./login.form.component.html')
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
