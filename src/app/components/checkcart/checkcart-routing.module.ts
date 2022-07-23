import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckIfProductsCartGuard } from 'src/app/guard/check-if-products-cart.guard';
import { CheckcartComponent } from './checkcart.component';

const routes: Routes = [
  { 
    path: '', 
    component: CheckcartComponent,
    //canActivate: [CheckIfProductsCartGuard]
  },
  { 
    path: 'shopfinish', 
    loadChildren: () => import('./shop-finish/shop-finish.module')
    .then(m => m.ShopFinishModule),
    canActivate: [CheckIfProductsCartGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckcartRoutingModule { }
