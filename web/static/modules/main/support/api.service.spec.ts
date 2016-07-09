require('es6-shim');
require('zone.js/dist/zone');
require('reflect-metadata');
require('rxjs');

import { addProviders, inject } from '@angular/core/testing';

import { HTTP_PROVIDERS } from '@angular/http';
import { APP_SERVICE_PROVIDERS, ApiService } from './services';

describe('api.service', () => {
  beforeEach(() => {
    addProviders([
      ...HTTP_PROVIDERS,
      ...APP_SERVICE_PROVIDERS
    ]);
  });
  it('should logout()', inject([ApiService], (apiService) => {
    expect(apiService.name).toEqual('ApiService');
  }));
});
