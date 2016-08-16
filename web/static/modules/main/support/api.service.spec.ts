require('es6-shim');
require('zone.js/dist/zone');
require('reflect-metadata');
require('rxjs');

import {TestBed, inject} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { HTTP_PROVIDERS } from '@angular/http';
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
        ...HTTP_PROVIDERS,
        ...APP_SERVICE_PROVIDERS
      ]
    });
  });
  it('should logout()', inject([ApiService], (apiService) => {
    expect(apiService.name).toEqual('ApiService');
  }));
});
