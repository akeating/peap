import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { SocketService } from './socket.service';
import { DataService } from './data.service';
import { LocalStorage } from './localstorage.service';

@Injectable()
export class ApiService {
  name: string = 'ApiService';
  token: string = null;
  user: User;

  constructor(private http: Http, private socketService: SocketService,
    private dataService: DataService, private localStorageService: LocalStorage) {
  }

  public loginWithToken(aToken: string): Observable<User> {
    this.token = aToken;
    return this.dereferenceToken().catch(err => {
      this.token = null;
      this.localStorageService.remove('token');
      return Observable.throw(err);
    });
  }

  public login(email, password): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = { email, password };
    return this.postWithHeaders('/api/token', body, headers).map(res => {
        this.token = res.token;
        this.localStorageService.set('token', this.token);
      })
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      })
      .flatMap(() => this.dereferenceToken());
  }

  dereferenceToken(): Observable<User> {
    return this.setupSocket().flatMap((result) => {
      return this.getUserImpl().map(user => {
        this.dataService.setAuthStatus(true);
        return user;
      });
    });
  }

  public logout(): void {
    this.token = null;
    this.dataService.setAuthStatus(false);
    this.localStorageService.remove('token');
  }

  public isLoggedIn(): boolean {
    return this.token !== null;
  }

  public getUser(): User {
    return this.user;
  }

  public incrementBy(by: number): Observable<any> {
    return this.sendGraphqlQuery(`mutation Mutation {increment(by: ${by}) { current_value }}`).map(
      result => this.dataService.setCurrentCount(result.data.increment.current_value)
    );
  }

  getUserImpl(): Observable<User> {
    let api = this.getUserGraphql();
    // let api = this.getUserRest();
    // let api = this.getUserSockets();
    return api.map(
      result => {
        let u = result.data.whoami;
        this.user = new User(u.id, u.name, u.email);
        return this.user;
      }
    );
  }

  getUserRest(): Observable<any> {
    return this.getJson('/api/whoami');
  }

  getUserGraphql(): Observable<any> {
    return this.sendGraphqlQuery('{whoami { id, name, email }}');
  }

  getUserSockets(): Observable<any> {
    return this.socketService.callApi('graphql', { query: '{whoami { id, name, email }}' });
  }

  sendGraphqlQuery(query): Observable<any> {
    return this.postJson('/api/graphql', { query: query });
  }

  postJson(url, body): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${this.token}`);
    return this.postWithHeaders(url, body, headers);
  }

  /* Response looks like this
  _body: "{"error":"Unauthorized"}"
  headers: Headers
  ok: false
  status: 401
  statusText: "Ok"
  type:2
  url: "http://localhost:4000/api/token"
  */
  postWithHeaders(url, body, headers): Observable<any> {
    let post_body = JSON.stringify(body);
    return this.http
      .post(url, post_body, { headers })
      .map(res => res.json())
      .catch((res: Response) => {
        if (res.status === 401) {
          this.handleUnauthorized();
        }
        return Observable.throw(res);
      });
  }

  getJson(url): Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${this.token}`);
    return this.getWithHeaders(url, headers);
  }

  getWithHeaders(url, headers): Observable<any> {
    return this.http
      .get(url, { headers })
      .map(res => res.json())
      .catch((res: Response) => {
        if (res.status === 401) {
          this.handleUnauthorized();
        }
        return Observable.throw(res);
      });
  }

  setupSocket(): Observable<any> {
    return this.socketService.connect(this.token)
      .catch(err => {
        return Observable.throw(err);
      });
  }

  handleUnauthorized() {
    this.dataService.setAuthStatus(false);
  }
}
