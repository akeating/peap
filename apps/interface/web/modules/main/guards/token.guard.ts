import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRoute,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService, LocalStorage, DataService } from '../services';
import { User } from '../types/user';

/*
  TokenGuard ensures that the user is not logged-in to allow the page, otherwise
  user is redirected to dashboard or provided redirectUrl.
*/
@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private router: Router, private apiService: ApiService,
    private localStorageService: LocalStorage, private route: ActivatedRoute,
    private dataService: DataService ) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const authStatus = this.dataService.getAuthStatus();
    if (authStatus) {
      this.redirectToContent(next.queryParams);
      return false;
    } else {
      let token = this.localStorageService.get('token');
      if (token) {
        return this.apiService.loginWithToken(token).map(
          (user: User) => {
            this.redirectToContent(next.queryParams);
            return false;
          }
        ).catch(err => {
          return Observable.of(true);
        });
      } else {
        return true;
      }
    }
  }

  redirectToContent(queryParams: any) {
    let returnUrl = queryParams['returnUrl'];
    if (returnUrl) {
      let decodedReturnUrl = decodeURIComponent(returnUrl);
      this.router.navigateByUrl(decodedReturnUrl);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
