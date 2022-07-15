import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { CreateDataComponent } from 'src/app/modal/create-data/create-data.component';
import { ComponentModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    ComponentModule,
  ],
  declarations: [CategoryPage],
  providers:[CreateDataComponent],
  entryComponents:[CreateDataComponent]
})
export class CategoryPageModule {}
