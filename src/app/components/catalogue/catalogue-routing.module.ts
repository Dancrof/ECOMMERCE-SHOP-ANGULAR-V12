import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue.component';
import { DetailsProductComponent } from './details-product/details-product.component';

const routes: Routes = [
  { path: '', component: CatalogueComponent },
  {path: 'product', component: DetailsProductComponent},
  {path: 'product/:id/:name', component: DetailsProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
