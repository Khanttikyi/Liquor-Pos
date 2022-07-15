import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public page: string;
  public Pages = [
    { title: 'Dashboard', url: '/folder/dashboard', icon: 'apps' },
    { title: 'Category', url: '/folder/category', icon: 'bag-add' },
    { title: 'Item', url: '/folder/item', icon: 'folder' },
    { title: 'Sales', url: '/folder/sales', icon: 'cart' },
    { title: 'Setting', url: '/folder/setting', icon: 'settings' },
  ];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.page = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
