import { Injectable } from '@angular/core';
import { CanActivate,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { DataService } from './services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private dataService: DataService) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authStatus = this.dataService.authStatus$.getValue();
    if (!authStatus) {
      let currentUrl = state.url;
      let returnUrl = encodeURIComponent(currentUrl);
      this.router.navigateByUrl(`/login?returnUrl=${returnUrl}`);
    }
    return authStatus;
  }
}
