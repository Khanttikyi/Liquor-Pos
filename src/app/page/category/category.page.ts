import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateDataComponent } from 'src/app/modal/create-data/create-data.component';
import { DatabaseService } from 'src/app/services/database.service';
import { Category, CategoryCol } from '../../const/category-const';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage implements OnInit {

  CATEGORY_ELEMENT_COL = JSON.parse(JSON.stringify(CategoryCol));
  Category: any[] = []
  constructor(private modalCtrl: ModalController, private database: DatabaseService) { }

  ngOnInit() {
   this.getCategory()
  }
  getCategory(){
    this.database.getCategoryTable().then(res => {
      this.Category = res
    })
  }
  async createNew(data?) {
    const modal = await this.modalCtrl.create({
      component: CreateDataComponent,
      componentProps: { type: "category", data: data },
      cssClass: 'my-modal'
    });
    modal.onDidDismiss().then(async (res: any) => {
      let result = res.data.data
      this.database.InsertCategoryTable(result).then(res=>{
        this.getCategory()
      })
      // let index = this.Category.findIndex((x) => x.code == result.code);
      // if (index >= 0) {
      //   this.Category[index] = result
      // } else {
      //   this.Category.push(result)
      // }
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
