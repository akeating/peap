require('reflect-metadata');
require('rxjs');
require('es6-shim');
require('zone.js/dist/zone');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './components/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
