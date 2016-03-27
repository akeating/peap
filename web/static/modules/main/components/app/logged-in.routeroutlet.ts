import { ViewContainerRef, DynamicComponentLoader, Directive, Attribute } from '@angular/core';
import { Router, RouterOutlet, ComponentInstruction } from '@angular/router-deprecated';
import { ApiService } from '../../support/api.service';

@Directive({
  selector: 'logged-in-router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: Array<String>;

  private router: Router;

  constructor(
    _viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
    _parentRouter: Router, @Attribute('name') nameAttr: string,
    private _ApiService: ApiService
  ) {
    super(_viewContainerRef, _loader, _parentRouter, nameAttr);

    this.router = _parentRouter;
    this.publicRoutes = [
      '', 'login', 'signup'
    ];
  }

  activate(instruction: ComponentInstruction) {
    let url = instruction.urlPath;
    let isLoggedIn = this._ApiService.isLoggedIn();
    let isPublicRoute = this.publicRoutes.indexOf(url) !== -1;
    if ((isLoggedIn && !isPublicRoute) ||
      (!isLoggedIn && isPublicRoute)) {
      return super.activate(instruction);
    }

    if (isLoggedIn && isPublicRoute) {
      this.router.navigate(['Dashboard']);
    } else {
      this.router.navigate(['Login']);
    }
  }

}
