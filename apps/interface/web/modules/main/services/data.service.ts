import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { PartialObserver } from 'rxjs/Observer';

@Injectable()
export class DataService {

  private authStatus$ = new BehaviorSubject<boolean>(false);
  private alertMessage$ = new Subject<string>();
  private currentCount$ = new Subject<number>();

  constructor() { }

  public setAuthStatus(status: boolean) {
    this.authStatus$.next(status);
  }

  public getAuthStatus(): boolean {
    return this.authStatus$.getValue();
  }

  public subscribeToAuthStatus(observer: PartialObserver<boolean>): Subscription {
    return this.authStatus$.subscribe(observer);
  }

  public receiveAlertMessage(message: string) {
    this.alertMessage$.next(message);
  }

  public subscribeToAlertMessages(observer: PartialObserver<string>): Subscription {
    return this.alertMessage$.subscribe(observer);
  }

  public setCurrentCount(count: number) {
    this.currentCount$.next(count);
  }

  public subscribeToCurrentCount(observer: PartialObserver<number>): Subscription {
    return this.currentCount$.subscribe(observer);
  }

}
