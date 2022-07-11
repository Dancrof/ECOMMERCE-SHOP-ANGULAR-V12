import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopFinishRoutingModule } from './shop-finish-routing.module';
import { ShopFinishComponent } from './shop-finish.component';


@NgModule({
  declarations: [
    ShopFinishComponent
  ],
  imports: [
    CommonModule,
    ShopFinishRoutingModule
  ]
})
export class ShopFinishModule { }
