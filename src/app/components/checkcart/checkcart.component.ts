import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs/operators';
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
@Component({
  selector: 'app-checkcart',
  templateUrl: './checkcart.component.html',
  styleUrls: ['./checkcart.component.scss']
})
export class CheckcartComponent implements OnInit {

  model = {
    firstName: '',
    lastName: '',
    adress: '',
    city: '',
    country: '',
    phone: '',
    store: ''
  }

  stores: StoreInterface[] = [];
  isDelivery: boolean = false;
  cart: ProductInterface[] = [];
  
  constructor(
    private dataSvc: DataService,
    private orderSvc: OrdersService,
    private detailOrderSvc: DetailsOrdersService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private producsSvc: ProductsService
  ) { this.checkItemsCart(); }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
  }
  
  onSubmit({form: formValue}: NgForm): void {
    console.log('guardar', formValue);

    const data: OrderInterface = {
      ...formValue.value,
      date: this.getCurrencyDay(),
      isDelivery: this.isDelivery,
      shippingAddress: this.model.adress,
      city: this.model.city,
      id: 0
    }
    this.orderSvc.saveOrder(data).pipe(
      tap(res => console.log('Order ->', res)),
      switchMap(({id: orderId}) => {
        const details = this.prepareDetailsOrder();
        return this.detailOrderSvc.saveDetailsOrders({details,orderId})
      }),
      tap(() => this.router.navigate(['/checkcart/shopfinish'])),
      delay(2000),
      tap(() => this.shoppingCartSvc.resetShoppingCart())
    ).subscribe();
  }

  private getStores(): void {
    this.dataSvc.getStores()
    .pipe(tap(
      (store: StoreInterface[]) => this.stores = store
    ))
    .subscribe();
  }

  onCheckDelivery(delivery: boolean): void{
    this.isDelivery = delivery;
  }

  private getCurrencyDay(): string{
    return new Date().toLocaleDateString()
  }

  private prepareDetailsOrder(): DetailOrderInterface[]{
    const details: DetailOrderInterface[] = [];
    this.cart.forEach((product: ProductInterface) => {
      const {id: productId, name: productName, quantity, stock} = product;
      
      //verifica si el stock es mayor igual a la cantidad y si es true 
      //retorna na resta caso contrario retorna cantidad que mantenia
      const updateStock = (stock >= quantity) ? (stock - quantity) : quantity;
      
      this.producsSvc.updateStock(productId, updateStock)
      .pipe(
        tap(() => details.push({productId, quantity, productName}))
      )
      .subscribe();

      details.push({productId, quantity, productName});
    });
    return details;
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$.pipe(
      tap(products => this.cart = products)
    )
    .subscribe();
  }
  
  private checkItemsCart(): void {
    this.shoppingCartSvc.cartAction$.pipe(
      tap(
        (products: ProductInterface[]) => {
          if(Array.isArray(products) && !products.length){     
          this.router.navigate(['/catalogo']);     
          }
        }
      )
    )
    .subscribe();
  }
}
