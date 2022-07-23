import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopFinishRoutingModule } from './shop-finish-routing.module';
import { ShopFinishComponent } from './shop-finish.component';
import { MaterialModule } from 'src/app/materia.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShopFinishComponent
  ],
  imports: [
    CommonModule,
    ShopFinishRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ShopFinishModule { }
