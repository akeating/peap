import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { ApiService, DataService, SocketService } from '../../../services';

@Component({
  selector: 'dashboard-component',
  styles: [ require('./dashboard.component.scss') ],
  template: require('./dashboard.component.html')
})
export class DashboardComponent {
  private userName: string;
  private userEmail: string;
  private currentCount: number;

  constructor( private apiService: ApiService, private router: Router,
    private socketService: SocketService, private dataService: DataService ) {
  }

  ngOnInit() {
    if (this.dataService.authStatus$.getValue() === true) {
      this.setupComponent();
    } else {
      this.dataService.authStatus$.subscribe(status => {
        if (status === true) {
          this.setupComponent();
        } else {
          let currentUrl = this.router.url;
          let returnUrl = encodeURIComponent(currentUrl);
          this.router.navigateByUrl(`/login?returnUrl=${returnUrl}`);
        }
      });
    }
  }

  setupComponent() {
    let user: User = this.apiService.getUser();
    this.userName = user.name;
    this.userEmail = user.email;
    this.dataService.alertMessage$.subscribe(message => {
      (<any>window).alert(message);
    });

    this.dataService.currentCount$.subscribe(count => {
      this.currentCount = count;
    });
    this.incrementBy(0);
  }

  logout() {
    this.apiService.logout();
    this.router.navigateByUrl('login');
  }

  incrementBy(by: number) {
    return this.apiService.incrementBy(by).subscribe();
  }
}
