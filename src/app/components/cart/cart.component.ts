import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <ng-container
      *ngIf="{
        quantity: quantity$ | async
      } as dataCart"
    >
      <mat-icon
        class="status__icon"
        [routerLink]="['/checkcart']"
        matBadge="{{ dataCart.quantity }}"
        matBadgeColor="warn"
      >
        shopping_cart
      </mat-icon>
    </ng-container>
  `,
  styleUrls: ['../navbar/navbar.component.scss'],
})
export class CartComponent implements OnInit {
  quantity$ = this.shoppingCartSvc.quantityAction$;

  constructor(private shoppingCartSvc: ShoppingCartService) {}

  ngOnInit() {}
}
