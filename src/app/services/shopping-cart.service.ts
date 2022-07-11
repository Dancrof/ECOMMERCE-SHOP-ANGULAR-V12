import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products: ProductInterface[] = [];
  
  private cartSubject = new BehaviorSubject<ProductInterface[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);
  private ivaSubject = new BehaviorSubject<number>(0);
  private subTotalSubject = new BehaviorSubject<number>(0);

  get cartAction$(): Observable<ProductInterface[]>{
    return this.cartSubject.asObservable();
  }
  get totalAction$(): Observable<number>{
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number>{
    return this.quantitySubject.asObservable();
  }
  get ivaAction$(): Observable<number>{
    return this.ivaSubject.asObservable();
  }
  get subTotalAction$(): Observable<number>{
    return this.subTotalSubject.asObservable();
  }

  //Metodo publico para no llamar a los metodos privados directamente
  publicUpdateCart(product: ProductInterface): void {
    this.addProductToCard(product);
    this.quantityProducts();
    this.subTotalProducts();
    this.ivaProducts();
  }

  //Metodo para resetear el carrito una ves hecha la compra
  resetShoppingCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.ivaSubject.next(0);
    this.subTotalSubject.next(0);
    this.products = [];
  }

  //Metodo para agregar un nuevo producto al carrito
  private addProductToCard(product: ProductInterface): void {
    
    const groupProductCart = this.products.find(({id}) => id === product.id);
    
    if(groupProductCart){
      
      groupProductCart.quantity += 1;
   
    } else {
      
      this.products.push({...product, quantity:1})
    }
    
    this.cartSubject.next(this.products);
  }
  
  //Metodo para calcual cuantos productos hay en el carrito
  private quantityProducts(): void {
    const quantity = this.products.reduce((acc, prod) => acc += prod.quantity, 0);;
    this.quantitySubject.next(quantity);
  }

  //Metodo para calcular el iva del subtotal del productos
  private subTotalProducts(): void {
    const subtotal = this.products.reduce((acc, prod) => acc += prod.price, 0);
    this.calcTotal(subtotal)
    this.subTotalSubject.next(subtotal);
  }


  //Metodo para calcular el iva del subtotal del productos
  ivaLet: number = 0.12;
  private ivaProducts(): void {
    const ivatotal = this.products.reduce((acc, prod) => acc += prod.price * this.ivaLet, 0);
    this.ivaSubject.next(ivatotal);
  }

  //Metodo para calcular la suma el valor total de los productos del carrito
  private calcTotal(subtotalParam: number): void {
    let total = this.products.reduce((acc, prod) => acc += prod.price * this.ivaLet, 0);
    total = total + subtotalParam;
    this.totalSubject.next(total);
  }

}
