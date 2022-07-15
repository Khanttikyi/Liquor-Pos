import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPageRoutingModule } from './item-routing.module';

import { ItemPage } from './item.page';
import { CreateDataItemComponent } from 'src/app/modal/create-data-item/create-data-item.component';
import { ComponentModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ItemPageRoutingModule,
    ComponentModule,
  ],
  declarations: [ItemPage],
  providers:[CreateDataItemComponent],
  entryComponents:[CreateDataItemComponent]
})
export class ItemPageModule {}
