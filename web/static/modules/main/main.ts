require('reflect-metadata');
require('zone.js/dist/zone');
require('rxjs');
require('es6-shim');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './components/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
