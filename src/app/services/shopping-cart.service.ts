import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  products: ProductInterface[] = [];

  private cartSubject = new BehaviorSubject<ProductInterface[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);
  private ivaSubject = new BehaviorSubject<number>(0);
  private subTotalSubject = new BehaviorSubject<number>(0);

  get cartAction$(): Observable<ProductInterface[]> {
    return this.cartSubject.asObservable();
  }
  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get ivaAction$(): Observable<number> {
    return this.ivaSubject.asObservable();
  }
  get subTotalAction$(): Observable<number> {
    return this.subTotalSubject.asObservable();
  }

  //Metodo publico para agregar un producto nuevo al carrito
  publicUpdateAddCart(product: ProductInterface): void {
    this.addProductToCard(product);
    this.quantityProducts();
    this.subTotalProducts();
    this.ivaProducts();
  }

  //Metodo publico para sumar cantidad de de productos del carrito
  publicUpdateSumCart(product: ProductInterface): void {
    this.sumProductToCard(product);
    this.quantityProducts();
    this.subTotalProducts();
    this.ivaProducts();
  }

  //Metodo publico para restar cantidad de de productos del carrito
  publicUpdateRestCart(product: ProductInterface): void {
    this.restQuantituProductToCard(product);
    this.quantityProducts();
    this.subTotalProducts();
    this.ivaProducts();
  }

  //Metodo publico para eliminar productos del carrito
  publicDeleteCart(product: ProductInterface): void {
    this.DeleteProductToCard(product)
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
    const groupProductCart = this.products.find(({ id }) => id === product.id);

    if (groupProductCart) {
      groupProductCart.quantity = 1;
    } else {
      this.products.push({ ...product, quantity: 1 });
    }

    this.cartSubject.next(this.products);
  }

  //Metodo para aumentar la cantidad de un producto del carrito
  private sumProductToCard(product: ProductInterface): void {
    const groupProductCart = this.products.find(({ id }) => id === product.id);
    if (groupProductCart && groupProductCart.quantity < groupProductCart.stock) {
      groupProductCart.quantity += 1;
      console.log(groupProductCart)
    } else {
      alert('La cantidad no deve ser mayor al stock del producto')
    }

    this.cartSubject.next(this.products);
  }

  //Metodo para disminuir un producto al carrito
  private restQuantituProductToCard(product: ProductInterface): void {
    
    const groupProductCart = this.products.find(({ id }) => id === product.id);

    if (groupProductCart && groupProductCart.quantity > 1) {
      groupProductCart.quantity -= 1;
    } else {
      alert('Producto minimo: 1')
    }
    this.cartSubject.next(this.products);
  }

  //Metodo para eliminar un producto al carrito
  private DeleteProductToCard(product: ProductInterface): void {
    
    const groupProductCart = this.products.find(({ id }) => id === product.id);
    
    if (groupProductCart) {
      const indexProduct = this.products.indexOf(product)
      this.products.splice(indexProduct, 1)

    } else {
      alert('Este Producto no Existe en el carrito')
    }
    this.subTotalProducts();
    this.ivaProducts();

    this.cartSubject.next(this.products);
  }

  //Metodo para calcual cuantos productos hay en el carrito
  private quantityProducts(): void {
    const quantity = this.products.reduce(
      (acc, prod) => (acc += prod.quantity),
      0
    );
    this.quantitySubject.next(quantity);
  }

  //Metodo para calcular el iva del subtotal del productos
  private subTotalProducts(): void {
    const subtotal = this.products.reduce(
      (acc, prod) => (acc += prod.price),
      0
    );
    this.calcTotal(subtotal);
    this.subTotalSubject.next(subtotal);
  }

  //Metodo para calcular el iva del subtotal del productos
  ivaLet: number = environment.IVA_ORDER;
  private ivaProducts(): void {
    const ivatotal = this.products.reduce(
      (acc, prod) => (acc += prod.price * this.ivaLet),
      0
    );
    this.ivaSubject.next(ivatotal);
  }

  //Metodo para calcular la suma el valor total de los productos del carrito
  private calcTotal(subtotalParam: number): void {
    let total = this.products.reduce(
      (acc, prod) => (acc += prod.price * this.ivaLet),
      0
    );
    total = total + subtotalParam;
    this.totalSubject.next(total);
  }
}
