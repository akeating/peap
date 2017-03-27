import { TestBed, inject} from '@angular/core/testing';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpModule } from '@angular/http';
import { APP_SERVICE_PROVIDERS, ApiService } from '../services';

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
  it('should logout()', inject([ApiService], (apiService: ApiService) => {
    expect(apiService.name).toEqual('ApiService');
  }));
});
