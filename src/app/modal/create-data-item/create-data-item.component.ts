import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/const/category-const';
import { Item } from 'src/app/const/item-const';

@Component({
  selector: 'app-create-data-item',
  templateUrl: './create-data-item.component.html',
  styleUrls: ['./create-data-item.component.scss'],
})
export class CreateDataItemComponent implements OnInit {
  @Input() type: any
  @Input() data: any
  createForm: FormGroup
  code: string = "IT-00"
  tempItem = Item
  categoryOption: any = Category
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadForm(this.data)
  }
  loadForm(data?) {
    this.createForm = new FormGroup({
      code: new FormControl(data ? data.code : null),
      category: new FormControl(data ? data.category : null, Validators.required),
      name: new FormControl(data ? data.name : null, Validators.required),
      brand: new FormControl(data ? data.brand : null, Validators.required),
      size: new FormControl(data ? data.size : null, Validators.required),
      stock: new FormControl(data ? data.stock : null, Validators.required),
      price: new FormControl(data ? data.price : null, Validators.required),
    })
  }
  saveNewData() {
    let length = (this.tempItem.length) + 1
    this.code = this.code + length
    let formValue = this.createForm.value
    if (this.data) {
      this.modalCtrl.dismiss({ data: formValue })
    } else {
      let value = { ...this.createForm.value, code: this.code }
      if (this.createForm.valid) {
        this.modalCtrl.dismiss({ data: value })
      }
    }

  }
  cancel() {
    this.modalCtrl.dismiss()
  }
}
