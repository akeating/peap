require('reflect-metadata');
require('rxjs');
require('es6-shim');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

import {TestBed, inject} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { HttpModule } from '@angular/http';
import { APP_SERVICE_PROVIDERS, ApiService } from './services';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

describe('api.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        APP_SERVICE_PROVIDERS
      ],
      imports: [
        HttpModule
      ]
    });
  });
  it('should logout()', inject([ApiService], (apiService) => {
    expect(apiService.name).toEqual('ApiService');
  }));
});
