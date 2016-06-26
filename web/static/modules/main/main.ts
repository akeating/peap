require('es6-shim');
require('zone.js/dist/zone');
require('reflect-metadata');
require('rxjs');

import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './components/app/app.component';
import { APP_GUARD_PROVIDERS } from './support/guards';
import { APP_SERVICE_PROVIDERS } from './support/services';
import { APP_ROUTER_PROVIDERS } from './components/app/app.routes';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  disableDeprecatedForms(), provideForms(),
  { provide: LocationStrategy, useClass: PathLocationStrategy },
  APP_GUARD_PROVIDERS,
  APP_SERVICE_PROVIDERS,
  APP_ROUTER_PROVIDERS
]);
