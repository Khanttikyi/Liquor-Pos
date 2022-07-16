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
import { ComponentModule } from './components/components.module';
import { DatabaseService } from './services/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@NgModule({
  declarations: [AppComponent, CreateDataComponent, CreateDataItemComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,KBZLoadingModule, FormsModule, ReactiveFormsModule,HttpClientModule,ComponentModule],
  providers: [
    CreateDataComponent, CreateDataItemComponent,
    HttpClient,
    DecimalPipe,
    DatabaseService,
    SQLite,
    SQLitePorter,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
