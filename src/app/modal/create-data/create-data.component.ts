import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/const/category-const';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-data',
  templateUrl: './create-data.component.html',
  styleUrls: ['./create-data.component.scss'],
})
export class CreateDataComponent implements OnInit {
  @Input() type: any
  @Input() data: any
  code: string = "CA-00"
  tempCategory = Category
  createForm: FormGroup
  constructor(private modalCtrl: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.loadForm(this.data)
  }
  loadForm(data?) {
    this.createForm = new FormGroup({
      code: new FormControl(data ? data.code : null),
      name: new FormControl(data ? data.name : null, Validators.required),
      brand: new FormControl(data ? data.brand : null, Validators.required),
      size: new FormControl(data ? data.size : null, Validators.required),
      stock: new FormControl(data ? data.stock : null, Validators.required),
    })
  }
  saveNewData() {
    let length = (this.tempCategory.length) + 1
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
