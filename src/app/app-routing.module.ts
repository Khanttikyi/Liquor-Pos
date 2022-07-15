import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/dashboard',
    loadChildren: () => import('./page/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'folder/category',
    loadChildren: () => import('./page/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'folder/item',
    loadChildren: () => import('./page/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'folder/sales',
    loadChildren: () => import('./page/sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'folder/setting',
    loadChildren: () => import('./page/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
