import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductInterface } from '../interfaces/product.interface';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckIfProductsCartGuard implements CanActivate {

  // si es true permite entrar a la ruta del carrito
  // si es false te deniega el acceso
  exit!: boolean;

  constructor(
    private shoppinSvc: ShoppingCartService,
    private router: Router
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //verificamos si el carrito esta vacio o no
    const dataCart = this.shoppinSvc.cartAction$.pipe(
      tap((cart: ProductInterface[]) => {
        if(Array.isArray(cart) && !cart.length){
          this.exit = false;   
          this.router.navigate(['/catalogo']);     
        } else{
          this.exit = true
        }
      })
    ).subscribe();

    return this.exit;
  }
  
}
