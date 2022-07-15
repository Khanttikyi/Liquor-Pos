import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  pages: any = []
  showMenu: boolean = false
  activeMenu: any;
  constructor(private navCtrl: NavController, private menu: MenuController) { }

  ngOnInit() {
    this.pages = this.getMenu()
  }
  getMenu() {
    return [
      { title: 'Dashboard', url: '/folder/dashboard', icon: 'apps' },
      { title: 'Category', url: '/folder/category', icon: 'bag-add' },
      { title: 'Item', url: '/folder/item', icon: 'folder' },
      { title: 'Sales', url: '/folder/sales', icon: 'cart' },
      { title: 'Setting', url: '/folder/setting', icon: 'settings' },

    ]

  }
  changeMenu() {
    this.pages = this.getMenu()
  }
  displayPage(currentPage) {
    this.closeMenu()
    this.navCtrl.navigateRoot(currentPage)
  }

  closeMenu() {
    this.menu.close('customMenu')
    this.removeIndex()
  }


  changeActiveMenu(value) {
    if (this.activeMenu == value)
      this.activeMenu = ""
    else
      this.activeMenu = value
  }
  removeIndex() {
    this.showMenu = false;
  }
  redirectHome() {
    this.closeMenu()
    this.navCtrl.navigateRoot("/folder/dashboard")
  }
  logout() {
    this.navCtrl.navigateRoot("/auth/login")
  }
}
