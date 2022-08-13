import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue.component';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from 'src/app/materia.module';
import { DetailsProductComponent } from './details-product/details-product.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from 'src/app/Interceptors/loading-interceptor.interceptor';


@NgModule({
  declarations: [
    CatalogueComponent,
    ProductComponent,
    DetailsProductComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    MaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
})
export class CatalogueModule { }
