import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { tap } from 'rxjs/operators';
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
  

  displayedColumns = ['id', 'name', 'quantity','price', 'delete'];
  dataSource = this.cart$;
  

  constructor(
    private shoppingCartSvc: ShoppingCartService,
  ) { }

  ngOnInit(): void {

  }
  //aumenta la cantidad de un producto
  sumItem(product: ProductInterface): void {
    this.shoppingCartSvc.publicUpdateAddCart(product)
  }

  //disminuye la cantidad de un producto
  ResItem(product: ProductInterface): void {
    this.shoppingCartSvc.publicUpdateRestCart(product)
  }

  deleteCart(product: ProductInterface): void {
    this.shoppingCartSvc.publicDeleteCart(product)
  }
}
