import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrivateComponent } from './components/private/private.component';
import { NgChartsModule } from 'ng2-charts';



import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SalesComponent } from './components/sales/sales.component';
import { InvoiceComponent } from './components/invoice/invoice.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PrivateComponent,
    DashboardComponent,
    SalesComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule
    

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
