import { Component } from '@angular/core';

@Component({
  selector: 'app-component',
  styles: [ require('./app.component.scss') ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor() {}

}
