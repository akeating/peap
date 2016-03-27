import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
let { Socket } = require('phoenix'); // no typing available
import { DataService } from './data.service';

@Injectable()
export class SocketService {
  private socket: any;
  private channel: any;

  constructor(private dataService: DataService) {}

  connect(token: string): Observable<any> {
    return Observable.create(observer => {
      this.socket = new Socket('/socket', { params: { token: token }});
      this.socket.onOpen(resp => {
        observer.next(resp);
      });
      this.socket.onError(err => {
        this.socket.disconnect();
        return observer.error(err);
      });
      this.socket.connect();
    })
    .flatMap(() => this.joinChannel('rooms:lobby'));
  }

  joinChannel(channelName): Observable<any> {
    this.channel = this.socket.channel(channelName, {});
    let channel = this.channel;
    let dataService = this.dataService;
    return Observable.create(function (observer) {
      channel.on('new_message', payload => {
        dataService.receiveAlertMessage(payload.body);
      });
      channel.on('current_count', payload => {
        dataService.setCurrentCount(payload.body);
      });
      channel.join()
        .receive('ok', resp => {
          observer.next(resp);
        })
        .receive('error', err => {
          return observer.error(err);
        });
    });
  }

  callApi(apiName, body): Observable<any> {
    let channel = this.channel;
    return Observable.create(function (observer) {
      channel.push(apiName, { body: body || {}}, 10000)
        .receive('ok', (msg) => { observer.next(msg.body); })
        .receive('error', resp => { Observable.throw(new Error(resp)); });
    });
  }
}
