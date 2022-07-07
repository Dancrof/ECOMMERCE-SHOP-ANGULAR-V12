import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckcartRoutingModule } from './checkcart-routing.module';
import { CheckcartComponent } from './checkcart.component';


@NgModule({
  declarations: [
    CheckcartComponent
  ],
  imports: [
    CommonModule,
    CheckcartRoutingModule
  ]
})
export class CheckcartModule { }
