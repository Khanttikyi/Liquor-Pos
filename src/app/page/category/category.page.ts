import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateDataComponent } from 'src/app/modal/create-data/create-data.component';
import { Category, CategoryCol } from '../../const/category-const';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage implements OnInit {

  CATEGORY_ELEMENT_COL = JSON.parse(JSON.stringify(CategoryCol));
  Category: any[] = Category
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async createNew(data?) {
    const modal = await this.modalCtrl.create({
      component: CreateDataComponent,
      componentProps: { type: "category", data: data },
      cssClass: 'my-modal'
    });
    modal.onDidDismiss().then(async (res: any) => {
      let result = res.data.data
      console.log(result);
      let index = this.Category.findIndex((x) => x.code == result.code);
      if (index >= 0) {
        this.Category[index] = result
      } else {
        this.Category.push(result)
      }
    })
    return await modal.present();
  }
  delete(data?) {
    let index = this.Category.findIndex((x) => x.code == data.code);
    if (index >= 0) {
      this.Category.splice(index, 1);
    }
  }
}
