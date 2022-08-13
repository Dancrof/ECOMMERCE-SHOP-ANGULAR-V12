import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DetailOrderInterface } from 'src/app/interfaces/detailOrder.interface';
import { OrderInterface } from 'src/app/interfaces/order.interface';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { DataService } from 'src/app/services/data.service';
import { DetailsOrdersService } from 'src/app/services/detailsOrders.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-checkcart',
  templateUrl: './checkcart.component.html',
  styleUrls: ['./checkcart.component.scss'],
})
export class CheckcartComponent implements OnInit, OnDestroy {
  // validacion del los campos del formulario
  model = {
    firstName: '',
    lastName: '',
    adress: '',
    city: '',
    country: '',
    phone: '',
    store: '',
  };

  //propiedad para guardar las tiendas
  stores: StoreInterface[] = [];
  //valida si la entrega es a domicilio o no
  isDelivery: boolean = false;
  //porpiedad para guardad los porductos selecionados
  cart: ProductInterface[] = [];

  // propiedad para validar si el carrioto esta vacio o no
  isEmtpyCart!: boolean;

  //obserbable para desuscribir
  onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private dataSvc: DataService,
    private orderSvc: OrdersService,
    private detailOrderSvc: DetailsOrdersService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private producsSvc: ProductsService
  ) {
    this.emtpyCart();
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
  }

  //Realizo la orden de compra
  onSubmit({ form: formValue }: NgForm): void {
    console.log('guardar', formValue);

    const data: OrderInterface = {
      ...formValue.value,
      date: this.getCurrencyDay(),
      isDelivery: this.isDelivery,
      shippingAddress: this.model.adress,
      city: this.model.city,
      id: 0,
    };
    this.orderSvc
      .saveOrder(data)
      .pipe(
        tap((res) => console.log('Order ->', res)),
        switchMap(({ id: orderId }) => {
          const details = this.prepareDetailsOrder();
          return this.detailOrderSvc.saveDetailsOrders({ details, orderId });
        }),
        tap(() => this.router.navigate(['/checkcart/shopfinish'])),
        delay(2000),
        tap(() => this.shoppingCartSvc.resetShoppingCart()),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  //obtengo todas las tiendas del servidor
  private getStores(): void {
    this.dataSvc
      .getStores()
      .pipe(tap((store: StoreInterface[]) => (this.stores = store)))
      .subscribe();
  }
  //se oculta o mustras inputs adicionales si compra es a domicilio
  onCheckDelivery(delivery: boolean): void {
    this.isDelivery = delivery;
  }
  //se asigna la fecha del dia que se iso la orden
  private getCurrencyDay(): string {
    return new Date().toLocaleDateString();
  }
  //preparamos los tados que van a in en lod detalles del orden
  private prepareDetailsOrder(): DetailOrderInterface[] {
    const details: DetailOrderInterface[] = [];
    this.cart.forEach((product: ProductInterface) => {
      const { id: productId, name: productName, quantity, stock } = product;

      //verifica si el stock es mayor igual a la cantidad y si es true
      //retorna na resta caso contrario retorna cantidad que mantenia
      const updateStock = stock >= quantity ? stock - quantity : quantity;

      this.producsSvc
        .updateStock(productId, updateStock)
        .pipe(
          tap(() => details.push({ productId, quantity, productName })),
          takeUntil(this.onDestroy$)
          )
        .subscribe();

      details.push({ productId, quantity, productName });
    });
    return details;
  }
  //obtengo los productos selecionados del catalogo Http
  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(tap((products) => (this.cart = products)))
      .subscribe();
  }

  //retorna un true y el carrito no esta vacio y false y el carrito esta vacio
  emtpyCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((cart: ProductInterface[]) => {
          if (Array.isArray(cart) && !cart.length) {
            this.isEmtpyCart = false;
          } else {
            this.isEmtpyCart = true;
          }
        }),
        takeUntil(this.onDestroy$)
      ).subscribe();
  }

  // destruye el compoenete una ves canbamos de ruta
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
