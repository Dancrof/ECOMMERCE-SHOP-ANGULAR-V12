import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <ng-container
      *ngIf="{
        total: total$ | async,
        quantity: quantity$ | async
      } as dataCart"
    >
      {{ dataCart.total | currency }}
      <mat-icon matBadge="{{ dataCart.quantity }}" matBadgeColor="warn">
        shopping_cart
      </mat-icon>
    </ng-container>
  `,
})
export class CartComponent implements OnInit {
  
  quantity$ = this.shoppingCartSvc.quantityAction$;
  total$ = this.shoppingCartSvc.totalAction$;
  cart$ = this.shoppingCartSvc.cartAction$;

  constructor(private shoppingCartSvc: ShoppingCartService) {}

  ngOnInit() {}
}
