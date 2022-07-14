import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPageRoutingModule } from './item-routing.module';

import { ItemPage } from './item.page';
import { CreateDataItemComponent } from 'src/app/modal/create-data-item/create-data-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemPageRoutingModule,
  ],
  declarations: [ItemPage],
  providers:[CreateDataItemComponent],
  entryComponents:[CreateDataItemComponent]
})
export class ItemPageModule {}
