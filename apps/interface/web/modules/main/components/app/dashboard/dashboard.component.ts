import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartialObserver } from 'rxjs/Observer';
import { User } from '../../../types/user';
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
    let user: User = this.apiService.getUser();
    this.userName = user.name;
    this.userEmail = user.email;

    // Handle redirect back to login if no longer authorized
    const authChangeObserver: PartialObserver<boolean> = { next: (status: boolean) => this.authChange(status) };
    this.dataService.subscribeToAuthStatus(authChangeObserver);

    // Handle incoming alert messages
    const alertMessagesObserver: PartialObserver<string> = { next: (message: string) => this.alertMessage(message) };
    this.dataService.subscribeToAlertMessages(alertMessagesObserver);

    // Handle changes to current count
    const countObserver: PartialObserver<number> = { next: (count: number) => this.countChange(count) };
    this.dataService.subscribeToCurrentCount(countObserver);

    // Triggers a call to the server that in effect loads the current state
    this.incrementBy(0);
  }

  authChange(status: boolean): void {
    if (!status) {
      let currentUrl = this.router.url;
      let returnUrl = encodeURIComponent(currentUrl);
      this.router.navigateByUrl(`/login?returnUrl=${returnUrl}`);
    }
  }

  alertMessage(message: string) {
    (<any>window).alert(message);
  }

  countChange(count: number) {
    this.currentCount = count;
  }

  logout() {
    this.apiService.logout();
    this.router.navigateByUrl('login');
  }

  incrementBy(by: number) {
    return this.apiService.incrementBy(by).subscribe();
  }
}
