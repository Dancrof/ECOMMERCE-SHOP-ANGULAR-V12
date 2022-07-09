import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-details-products-cart',
  templateUrl: './details-products-cart.component.html',
  styleUrls: ['./details-products-cart.component.scss']
})
export class DetailsProductsCartComponent implements OnInit {

  subTotal$ = this.shoppingCartSvc.subTotalAction$;
  iva$ = this.shoppingCartSvc.ivaAction$;
  Total$ = this.shoppingCartSvc.totalAction$;
  cart$ = this.shoppingCartSvc.cartAction$;
  

  displayedColumns = ['id', 'name', 'quantity','price'];
  dataSource = this.cart$;
  
  constructor(private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
