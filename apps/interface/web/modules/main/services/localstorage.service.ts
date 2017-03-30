import { Injectable } from '@angular/core';

const TOKEN_KEY: string = 'token';

@Injectable()
export class LocalStorageService {
  private localStorage: LocalStorage;
  constructor() {
    this.localStorage = new LocalStorage();
  }

  public setToken(value: string): void {
    this.localStorage.set(TOKEN_KEY, value);
  }

  public getToken(): string {
    return this.localStorage.get(TOKEN_KEY);
  }

  public clearToken(): void {
    this.localStorage.remove(TOKEN_KEY);
  }
}

class LocalStorage {
  public localStorage: any;

  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.localStorage = localStorage;
  }

  public set(key: string, value: string): void {
    this.localStorage[key] = value;
  }

  public get(key: string): string {
    return this.localStorage[key] || false;
  }

  public setObject(key: string, value: any): void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    return JSON.parse(this.localStorage[key] || '{}');
  }

  public remove(key: string): any {
    this.localStorage.removeItem(key);
  }
}

export const LOCAL_STORAGE_PROVIDERS: any[] = [
  { provide: LocalStorageService, useClass: LocalStorageService }
];
