import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-data-item',
  templateUrl: './create-data-item.component.html',
  styleUrls: ['./create-data-item.component.scss'],
})
export class CreateDataItemComponent implements OnInit {
  @Input() type: any
  @Input() data: any
  createForm: FormGroup
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadForm(this.data)
  }
  loadForm(data?) {
    this.createForm = new FormGroup({
      name: new FormControl(data ? data.name : null, Validators.required),
      brand: new FormControl(data ? data.brand : null, Validators.required),
      size: new FormControl(data ? data.size : null, Validators.required),
      stock: new FormControl(data ? data.stock : null, Validators.required),
      price: new FormControl(data ? data.price : null, Validators.required),
    })
  }
  saveNewData() {
    if (this.createForm.valid) {
      let value = this.createForm.value
      this.modalCtrl.dismiss({ data: value })
    }
  }
  cancel() {
    this.modalCtrl.dismiss()
  }
}
