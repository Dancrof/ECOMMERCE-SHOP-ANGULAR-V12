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
      <a [routerLink]="['/checkcart']">
        <mat-icon matBadge="{{ dataCart.quantity }}" matBadgeColor="warn">
          shopping_cart
        </mat-icon>
      </a>
    </ng-container>
  `,
  styleUrls: ['../navbar/navbar.component.scss']
})
export class CartComponent implements OnInit {
  quantity$ = this.shoppingCartSvc.quantityAction$;

  constructor(private shoppingCartSvc: ShoppingCartService) {}

  ngOnInit() {}
}
