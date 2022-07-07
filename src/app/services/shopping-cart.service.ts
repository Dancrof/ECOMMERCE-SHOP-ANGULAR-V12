import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products: ProductInterface[] = [];

  private cartSubject = new Subject<ProductInterface[]>();
  private totalSubject = new Subject<number>();
  private quantitySubject = new Subject<number>();

  get cartAction$(): Observable<ProductInterface[]>{
    return this.cartSubject.asObservable();
  }
  get totalAction$(): Observable<number>{
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number>{
    return this.quantitySubject.asObservable();
  }

  //Metodo publico para no llamar a los metodos privados directamente
  publicUpdateCart(product: ProductInterface): void {
    this.addProductToCard(product);
    this.quantityProducts();
    this.calcTotal();
  }


  //Metodo para calcular la suma el valor total de los productos del carrito
  private calcTotal(): void {
    const total = this.products.reduce((acc, prod) => acc += prod.price, 0);
    this.totalSubject.next(total);
  }

  //Metodo para calcual cuantos productos hay en el carrito
  private quantityProducts(): void {
    const quantity = this.products.length;
    this.quantitySubject.next(quantity);
  }

  //Metodo para agregar un nuevo producto al carrito
  private addProductToCard(product: ProductInterface): void {
    this.products.push(product);
    this.cartSubject.next(this.products);
  }


}
