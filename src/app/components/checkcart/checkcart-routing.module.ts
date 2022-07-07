import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckcartComponent } from './checkcart.component';

const routes: Routes = [{ path: '', component: CheckcartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckcartRoutingModule { }
