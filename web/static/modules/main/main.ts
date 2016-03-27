require('es6-shim');
require('zone.js/dist/zone');
require('reflect-metadata');
require('rxjs');
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { SERVICE_PROVIDERS } from './support/services';
import { AppComponent } from './components/app/app.component';

bootstrap(AppComponent, [ HTTP_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
  SERVICE_PROVIDERS ]);
