import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login.form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { APP_GUARD_PROVIDERS } from '../../support/guards';
import { APP_SERVICE_PROVIDERS } from '../../support/services';
import { APP_ROUTER_PROVIDERS, routerConfig } from './app.routes';

@NgModule({
    declarations: [
      AppComponent,
      LoginComponent,  // this should probably be a NgModule
      LoginFormComponent,  // methinks this should be part of the LoginModule
      DashboardComponent  // this should probably be a NgModule
    ],
    providers: [
      APP_GUARD_PROVIDERS,
      APP_SERVICE_PROVIDERS,
      APP_ROUTER_PROVIDERS,
      HTTP_PROVIDERS
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(routerConfig),
      FormsModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
