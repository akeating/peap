import { Injectable } from '@angular/core';
import { CanActivate,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { DataService, ApiService, LocalStorage } from '../services';
import { User } from '../types';
import { Observable } from 'rxjs';

/*
  AuthGuard ensures that the user must be logged-in to allow the page, otherwise
  user is denied and redirected to login.
*/
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private dataService: DataService,
    private apiService: ApiService,
    private localStorageService: LocalStorage ) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const authStatus = this.dataService.getAuthStatus();

    // User is not authorized, so let' see if there's a stored token we can use
    // to login with
    if (!authStatus) {
      let token = this.localStorageService.get('token');
      if (token) {

        // Yes there's a token, let's try to login
        return this.apiService.loginWithToken(token).map(
          (user: User) => {
            // Successfully logged in with the existing token, so we can
            // simply allow the page
            return true;
          }
        ).catch(err => {

          // There was an error attempting to login with the stored token,
          // so we need to deny and redirect to login
          this.redirectToLogin(state.url);
          return Observable.of(false);
        });
      } else {

        // There is no token to attempt login
        // so we need to deny and redirect to login
        this.redirectToLogin(state.url);
        return false;
      }
    }

    // User is already authorized, so show the page
    return true;
  }

  redirectToLogin(currentUrl: string) {
    let returnUrl = encodeURIComponent(currentUrl);
    this.router.navigateByUrl(`/login?returnUrl=${returnUrl}`);
  }
}
