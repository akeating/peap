require('reflect-metadata');
require('rxjs');
require('core-js');
require('zone.js/dist/zone');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './components/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
