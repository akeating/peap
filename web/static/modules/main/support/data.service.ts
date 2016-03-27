import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  public authStatus$ = new BehaviorSubject<boolean>(false);
  public alertMessage$ = new Subject<string>();
  public currentCount$ = new Subject<number>();

  constructor() { }

  public setAuthStatus(status: boolean) {
    this.authStatus$.next(status);
  }

  public receiveAlertMessage(message: string) {
    this.alertMessage$.next(message);
  }

  public setCurrentCount(count: number) {
    this.currentCount$.next(count);
  }
}
