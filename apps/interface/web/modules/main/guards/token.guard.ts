import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRoute,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService, LocalStorage } from '../services';
import { User } from '../types/user';

@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private router: Router, private apiService: ApiService,
    private localStorageService: LocalStorage, private route: ActivatedRoute) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let token = this.localStorageService.get('token');
    if (token) {
      return this.apiService.loginWithToken(token)
      .map((user: User) => {
        this.onSuccessFullLogin();
        return false;
      })
      .catch(() => Observable.of(true));
    } else {
      return true;
    }
  }

  onSuccessFullLogin(): void {
    let returnUrl = this.route.snapshot.params['returnUrl'];
    if (returnUrl) {
      let decodedReturnUrl = decodeURIComponent(returnUrl);
      this.router.navigateByUrl(decodedReturnUrl);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
