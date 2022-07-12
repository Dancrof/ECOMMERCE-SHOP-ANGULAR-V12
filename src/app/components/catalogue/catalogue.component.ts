import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { tap } from 'rxjs/operators';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-catalogue',
  template: `
    <section class="content__card">
      <app-product
        (addCartProduct)="addToCart($event)"
        [product]="product"
        *ngFor="let product of listProduct"
      ></app-product>
    </section>
  `,
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  listProduct!: ProductInterface[];

  constructor(
    private productSvc: ProductsService,
    private shoppingCartSvc: ShoppingCartService
  ) {}

  ngOnInit(): void {
    // Estoy llamando los productos y asignandolos a la propiedad product
    this.productSvc
      .getProducts()
      .pipe(
        tap(
          (product: ProductInterface[]) => (this.listProduct = product)
          )
        )
      .subscribe();
  }

  //Pasandole un producto al servicio con el metodo publico
  addToCart(product: ProductInterface): void {
    this.shoppingCartSvc.publicUpdateCart(product);
  }
}
