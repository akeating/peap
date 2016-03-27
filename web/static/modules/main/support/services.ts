import { provide } from '@angular/core';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { LocalStorage } from './localstorage.service';
import { SocketService } from './socket.service';

export const SERVICE_PROVIDERS: any[] = [
  provide(ApiService, {useClass: ApiService}),
  provide(DataService, {useClass: DataService}),
  provide(LocalStorage, {useClass: LocalStorage}),
  provide(SocketService, {useClass: SocketService})
];

export {
  ApiService,
  DataService,
  LocalStorage,
  SocketService
};
