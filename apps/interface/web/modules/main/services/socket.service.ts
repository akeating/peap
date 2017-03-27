import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Socket, Channel } from 'phoenix';
import { DataService } from './data.service';

@Injectable()
export class SocketService {
  private socket: Socket;
  private channel: Channel;

  constructor(private dataService: DataService) {}

  connect(token: string): Observable<any> {
    return Observable.create((observer: Observer<string>) => {
      const options = { params: { token }};
      this.socket = new Socket('/socket', options);
      this.socket.onOpen(() => {
        observer.next(null);
      });
      this.socket.onError((err: Error) => {
        this.socket.disconnect();
        return observer.error(err);
      });
      this.socket.connect();
    })
    .flatMap(() => this.joinChannel('rooms:lobby'));
  }

  joinChannel(channelName: string): Observable<any> {
    this.channel = this.socket.channel(channelName, {});
    return Observable.create((observer: Observer<string>) => {
      this.channel.on('new_message', payload => {
        this.dataService.receiveAlertMessage(payload.body);
      });
      this.channel.on('current_count', payload => {
        this.dataService.setCurrentCount(payload.body);
      });
      this.channel.join()
        .receive('ok', resp => {
          observer.next(resp);
        })
        .receive('error', err => {
          return observer.error(err);
        });
    });
  }

  callApi(apiName: string, body: any): Observable<any> {
    return Observable.create((observer: Observer<string>) => {
      this.channel.push(apiName, { body: body || {}}, 10000)
        .receive('ok', (msg) => { observer.next(msg.body); })
        .receive('error', resp => { Observable.throw(new Error(resp)); });
    });
  }
}
