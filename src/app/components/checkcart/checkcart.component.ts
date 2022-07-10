import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { DetailOrderInterface } from 'src/app/interfaces/detailOrder.interface';
import { OrderInterface } from 'src/app/interfaces/order.interface';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { DataService } from 'src/app/services/data.service';
import { DetailsOrdersService } from 'src/app/services/detailsOrders.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

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
    private shoppingCartSvc: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetailsOrder();
  }
  
  onSubmit({form: formValue}: NgForm): void {
    console.log('guardar', formValue);

    const data: OrderInterface = {
      ...formValue,
      date: this.getCurrencyDay(),
      pickup: this.isDelivery,
      name: '',
      shippingAddress: '',
      city: ''
    }
    this.orderSvc.saveOrder(data).pipe(
      tap(res => console.log(res)),
      switchMap((order) => {
        const orderId = order.id;
        const details = this.prepareDetailsOrder();
        return this.detailOrderSvc.saveDetailsOrders({details,orderId})
      })
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
      const {id: productId, name: productName, quantity: productQuantity, stock} = product;
      //Resolver este error
      details.push({productId, productQuantity, productName});
    });
    return details;
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$.pipe(
      tap(products => this.cart = products)
    )
    .subscribe();
  }
}
