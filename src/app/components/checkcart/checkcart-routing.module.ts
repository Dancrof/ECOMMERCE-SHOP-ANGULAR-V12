import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckcartComponent } from './checkcart.component';

const routes: Routes = [
  { path: '', component: CheckcartComponent },
  { path: 'shopfinish', loadChildren: () => import('./shop-finish/shop-finish.module').then(m => m.ShopFinishModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckcartRoutingModule { }
