import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app-component',
  styles: [ require('./app.component.scss') ],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: [],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor() {}

}
