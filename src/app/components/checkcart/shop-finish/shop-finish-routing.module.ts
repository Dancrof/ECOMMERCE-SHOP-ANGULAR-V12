import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopFinishComponent } from './shop-finish.component';

const routes: Routes = [{ path: '', component: ShopFinishComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopFinishRoutingModule { }
