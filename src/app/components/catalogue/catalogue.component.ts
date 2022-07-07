import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {tap} from 'rxjs/operators';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  listProduct!: ProductInterface[];

  constructor(
    private productSvc: ProductsService,
    private shoppingCartSvc: ShoppingCartService
  ) { }

  ngOnInit(): void {
    
    // Estoy llamando los productos y asignandolos a la propiedad product
    this.productSvc.getProducts().pipe(
      tap( (product: ProductInterface[]) => this.listProduct = product)
    ).subscribe();
  }

  addToCart(product: ProductInterface): void{
    console.log(product);
    this.shoppingCartSvc.publicUpdateCart(product);
  }
}
