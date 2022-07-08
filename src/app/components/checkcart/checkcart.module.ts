import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckcartRoutingModule } from './checkcart-routing.module';
import { CheckcartComponent } from './checkcart.component';
import { DetailsProductsCartComponent } from './details-products-cart/details-products-cart.component';
import { MaterialModule } from 'src/app/materia.module';


@NgModule({
  declarations: [
    CheckcartComponent,
    DetailsProductsCartComponent
  ],
  imports: [
    CommonModule,
    CheckcartRoutingModule,
    MaterialModule
  ]
})
export class CheckcartModule { }
