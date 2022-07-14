import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateDataComponent } from './modal/create-data/create-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDataItemComponent } from './modal/create-data-item/create-data-item.component';

@NgModule({
  declarations: [AppComponent, CreateDataComponent,CreateDataItemComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CreateDataComponent,CreateDataItemComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
