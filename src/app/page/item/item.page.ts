import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item, ItemCol } from 'src/app/const/item-const';
import { CreateDataItemComponent } from 'src/app/modal/create-data-item/create-data-item.component';
import { Category, CategoryCol } from '../../const/category-const';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  ITEM_ELEMENT_COL = JSON.parse(JSON.stringify(ItemCol));
  Item: any[] = Item
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }
  async createNew(data?) {
    const modal = await this.modalCtrl.create({
      component: CreateDataItemComponent,
      componentProps: { type: "category", data: data },
      cssClass: 'my-modal'
    });
    modal.onDidDismiss().then(async (res) => {
      console.log(res);
      this.Item.push(res.data.data)
    })
    return await modal.present();
  }
  delete(data?) {
    let index = this.Item.findIndex((x) => x.name == data.name);
    if (index >= 0) {
      this.Item.splice(index, 1);
    }
  }
}