import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateDataComponent } from './modal/create-data/create-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDataItemComponent } from './modal/create-data-item/create-data-item.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/httpconfig.interceptor';
import { KBZLoadingModule } from './services/loading/loading.module';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, CreateDataComponent, CreateDataItemComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,KBZLoadingModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CreateDataComponent, CreateDataItemComponent,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    HttpClient,DecimalPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
