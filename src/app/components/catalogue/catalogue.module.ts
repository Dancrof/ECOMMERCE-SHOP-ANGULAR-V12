import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue.component';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from 'src/app/materia.module';
import { DetailsProductComponent } from './details-product/details-product.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CatalogueComponent,
    ProductComponent,
    DetailsProductComponent,
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    MaterialModule,
    SharedModule
  ],
})
export class CatalogueModule { }
