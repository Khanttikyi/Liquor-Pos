import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public Pages = [
    { title: 'Dashboard', url: '/folder/dashboard', icon: 'apps' },
    { title: 'Category', url: '/folder/category', icon: 'bag-add' },
    { title: 'Item', url: '/folder/item', icon: 'folder' },
    { title: 'Sales', url: '/folder/sales', icon: 'cart' },
    { title: 'Setting', url: '/folder/setting', icon: 'settings' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
