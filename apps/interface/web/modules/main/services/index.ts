import { ApiService } from './api.service';
import { DataService } from './data.service';
import { LocalStorageService } from './localstorage.service';
import { SocketService } from './socket.service';

export const APP_SERVICE_PROVIDERS: any[] = [
  { provide: ApiService, useClass: ApiService },
  { provide: DataService, useClass: DataService },
  { provide: LocalStorageService, useClass: LocalStorageService },
  { provide: SocketService, useClass: SocketService }
];

export {
  ApiService,
  DataService,
  LocalStorageService,
  SocketService
};
